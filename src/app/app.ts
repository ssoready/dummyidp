export type App = {
  id: string;
  spAcsUrl?: string;
  spEntityId?: string;
  domain?: string;
  users?: AppUser[];
};

export type AppUser = {
  email: string;
  firstName: string;
  lastName: string;
};

export function appIdpEntityId(app: App): string {
  return `https://${process.env.VERCEL_URL}/apps/${app.id}`;
}

export function appIdpRedirectUrl(app: App): string {
  return `https://${process.env.VERCEL_URL}/apps/${app.id}/sso`;
}
