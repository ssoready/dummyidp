import { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { App } from "@/lib/app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      const id = req.query["id"] as string;

      const result = await kv.hgetall(id);
      if (!result) {
        res.status(404).send({});
      }

      res.status(200).json(result);
      return;
    case "POST":
      const app = JSON.parse(req.body) as App;

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

      res.status(200).send({});
      return;
    default:
      res.status(405);
      return;
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
  if (listBody?.Resources?.length > 0) {
    return listBody.Resources[0].id;
  }
  return undefined;
}
