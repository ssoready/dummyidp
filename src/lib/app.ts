import { ulid } from "ulid";
import { kv } from "@vercel/kv";

export type App = {
  id: string;
  users: AppUser[];
  spAcsUrl?: string;
  spEntityId?: string;
  scimBaseUrl?: string;
  scimBearerToken?: string;
};

export type AppUser = {
  email: string;
  firstName: string;
  lastName: string;
};

export function appIdpEntityId(app: App): string {
  return `https://dummyidp.com/apps/${app.id}`;
}

export function appIdpRedirectUrl(app: App): string {
  return `https://${process.env.NEXT_PUBLIC_DUMMYIDP_CUSTOM_DOMAIN || process.env.VERCEL_URL}/apps/${app.id}/sso`;
}

export function appIdpMetadataUrl(app: App): string {
  return `https://${process.env.NEXT_PUBLIC_DUMMYIDP_CUSTOM_DOMAIN || process.env.VERCEL_URL}/apps/${app.id}/metadata`;
}

export function appLoginUrl(app: App): string {
  return `https://${process.env.NEXT_PUBLIC_DUMMYIDP_CUSTOM_DOMAIN || process.env.VERCEL_URL}/apps/${app.id}/login`;
}

export async function createApp(): Promise<string> {
  const id = `app_${ulid().toLowerCase()}`;
  await kv.hset(id, {
    id,
    users: [
      { email: "john.doe@example.com", firstName: "John", lastName: "Doe" },
      {
        email: "abraham.lincoln@example.com",
        firstName: "Abraham",
        lastName: "Lincoln",
      },
    ],
  });
  return id;
}

export async function getApp(id: string): Promise<App | undefined> {
  const result = await kv.hgetall(id);
  if (!result) {
    return undefined;
  }

  return result as unknown as App;
}

export async function upsertApp(app: App): Promise<void> {
  // get a list of users being deleted, so we can SCIM DELETE them later
  const oldApp = (await kv.hgetall(app.id)) as App | undefined;
  const deletedUserEmails: string[] = [];
  if (oldApp) {
    // could do this with sets, but NextJS doesn't seem to support
    // set.difference, so there's very little gain
    for (const oldUser of oldApp.users) {
      let found = false;
      for (const newUser of app.users) {
        if (newUser.email === oldUser.email) {
          found = true;
        }
      }

      if (!found) {
        deletedUserEmails.push(oldUser.email);
      }
    }
  }

  // update the app
  await kv.hset(app.id, app);

  // scim sync
  if (app.scimBaseUrl && app.scimBearerToken) {
    // Carry out a scim sync; our approach is stateless and is close to Okta's
    // syncing approach.
    //
    // For each user, list users filtered by email address. If we get a result,
    // PUT against the resulting user ID. If we don't get a result, POST a new
    // user. Do not persist state about assigned user IDs between syncs.
    for (const user of app.users) {
      const userId = await scimUserByEmail(app, user.email);
      if (userId) {
        await fetch(`${app.scimBaseUrl}/Users/${userId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${app.scimBearerToken}` },
          body: JSON.stringify({
            userName: user.email,
            name: {
              givenName: user.firstName,
              familyName: user.lastName,
            },
          }),
        });
      } else {
        await fetch(`${app.scimBaseUrl}/Users`, {
          method: "POST",
          headers: { Authorization: `Bearer ${app.scimBearerToken}` },
          body: JSON.stringify({
            userName: user.email,
            name: {
              givenName: user.firstName,
              familyName: user.lastName,
            },
          }),
        });
      }
    }

    // delete removed users
    for (const email of deletedUserEmails) {
      const userId = await scimUserByEmail(app, email);
      if (userId) {
        await fetch(`${app.scimBaseUrl}/Users/${userId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${app.scimBearerToken}` },
        });
      }
    }
  }
}

async function scimUserByEmail(
  app: App,
  email: string,
): Promise<string | undefined> {
  const filter = new URLSearchParams({
    filter: `userName eq "${email}"`,
  });

  const listResponse = await fetch(`${app.scimBaseUrl}/Users?${filter}`, {
    headers: { Authorization: `Bearer ${app.scimBearerToken}` },
  });
  const listBody = await listResponse.json();

  // in practice, SCIM servers put the results into either `resources` or
  // `Resources`
  const resources = listBody?.resources ?? listBody?.Resources ?? []
  if (resources.length > 0) {
    return resources[0].id;
  }
  return undefined;
}
