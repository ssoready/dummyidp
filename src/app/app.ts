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
  return `https://${process.env.VERCEL_URL}/apps/${app.id}/sso`;
}
