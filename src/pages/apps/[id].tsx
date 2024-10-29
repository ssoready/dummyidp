import Layout from "@/components/Layout";
import { useApp } from "@/lib/hooks";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DocsLink } from "@/components/DocsLink";
import { Label } from "@/components/ui/label";
import {
  appIdpEntityId,
  appIdpMetadataUrl,
  appIdpRedirectUrl,
} from "@/lib/app";
import { Badge } from "@/components/ui/badge";
import { SimulateLoginButton } from "@/components/SimulateLoginButton";
import { INSECURE_PUBLIC_CERTIFICATE } from "@/lib/insecure-cert";
import { SPSettingsForm } from "@/components/SPSettingsForm";
import { SCIMSettingsForm } from "@/components/SCIMSettingsForm";
import { UsersSettingsForm } from "@/components/UsersSettingsForm";

export default function Page() {
  const router = useRouter();
  const app = useApp(router.query.id as string);
  const certificateDownloadURL = `data:text/plain;base64,${btoa(INSECURE_PUBLIC_CERTIFICATE)}`;

  return (
    <Layout>
      <div className="px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb className="mt-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Apps</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/apps/${app?.id}`}>
                  {app?.id}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="mt-2 text-3xl font-semibold">{app?.id}</h1>
              <p className="mt-1 text-muted-foreground">
                A DummyIDP app lets you emulate your customer's identity
                provider.
                <DocsLink to="https://ssoready.com/docs/dummyidp#creating-a-dummyidp-app" />
              </p>
            </div>
            <SimulateLoginButton app={app} />
          </div>

          <div className="mt-8 grid grid-cols-6 gap-4">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>
                  SAML IDP Settings
                  <DocsLink to="https://ssoready.com/docs/dummyidp#idp-settings" />
                </CardTitle>
                <CardDescription>
                  These are SAML settings that identity providers (DummyIDP, in
                  this case) assign. Normally, they'll come from your customer's
                  Okta/Google/Microsoft/etc instead. You need to put these into
                  your application's SAML settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-y-2">
                  <div>
                    <Label>IDP Metadata URL</Label>
                    <div className="text-sm text-muted-foreground">
                      {app && appIdpMetadataUrl(app)}
                    </div>
                  </div>

                  <div>
                    <Label>IDP Entity ID</Label>
                    <div className="text-sm text-muted-foreground">
                      {app && appIdpEntityId(app)}
                    </div>
                  </div>

                  <div>
                    <Label>IDP Redirect URL</Label>
                    <div className="text-sm text-muted-foreground">
                      {app && appIdpRedirectUrl(app)}
                    </div>
                  </div>

                  <div>
                    <Label>IDP Certificate</Label>
                    <a
                      href={certificateDownloadURL}
                      download="DummyIDP Certificate.crt"
                      className="block text-sm text-blue-600"
                    >
                      <span>Download (.crt)</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>
                  SAML SP Settings
                  <DocsLink to="https://ssoready.com/docs/dummyidp#sp-settings" />
                </CardTitle>
                <CardDescription>
                  These are SAML settings assigned by the service provider
                  ("SP"), i.e. your application. You need to copy those settings
                  from your application into here.
                </CardDescription>
              </CardHeader>
              <CardContent>{app && <SPSettingsForm app={app} />}</CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>
                  SCIM Settings
                  <DocsLink to="https://ssoready.com/docs/dummyidp#scim-settings" />
                  {app?.scimBaseUrl && app?.scimBearerToken && (
                    <Badge className="ml-4" variant="outline">
                      Syncing
                      <span className="ml-2 relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Settings for directory syncing over SCIM. Optional.
                </CardDescription>
              </CardHeader>
              <CardContent>{app && <SCIMSettingsForm app={app} />}</CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>
                  Users
                  <DocsLink to="https://ssoready.com/docs/dummyidp#users-settings" />
                </CardTitle>
                <CardDescription>
                  You can simulate SAML logins from this list of users. They'll
                  be synced over SCIM if you've configured it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {app && <UsersSettingsForm app={app} />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
