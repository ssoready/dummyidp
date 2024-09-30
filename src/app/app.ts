export type App = {
  id: string;
  spAcsUrl?: string;
  spEntityId?: string;
};

export function appIdpEntityId(app: App): string {
  return `https://${process.env.VERCEL_URL}/apps/${app.id}`;
}

export function appIdpRedirectUrl(app: App): string {
  return `https://${process.env.VERCEL_URL}/apps/${app.id}/sso`;
}
