import { getApp } from "@/app/actions";
import { PlusGridItem, PlusGridRow } from "@/components/PlusGrid";
import Link from "next/link";
import Navbar from "@/components/Navbar";
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
import { appIdpEntityId, appIdpRedirectUrl } from "@/app/app";
import { useMemo } from "react";
import { ArrowDownToLineIcon } from "lucide-react";
import { SPSettingsForm } from "@/app/apps/[id]/SPSettingsForm";
import { ap } from "@upstash/redis/zmscore-uDFFyCiZ";
import { GradientBackground } from "@/components/GradientBackground";
import { UsersSettingsForm } from "@/app/apps/[id]/UsersSettingsForm";
import { Button } from "@/components/ui/button";
import { SimulateLoginButton } from "@/app/apps/[id]/SimulateLoginButton";
import { SCIMSettingsForm } from "@/app/apps/[id]/SCIMSettingsForm";
import { Metadata } from "next";
import { INSECURE_PUBLIC_CERTIFICATE } from "@/lib/insecure-cert";

export const metadata: Metadata = {
  title: "App",
};

export default async function Page({ params }: { params: { id: string } }) {
  const app = await getApp(params.id);
  if (app === undefined) {
    return <h1>not found</h1>;
  }

  const certificateDownloadURL = `data:text/plain,${INSECURE_PUBLIC_CERTIFICATE}`;

  return (
    <div className="overflow-hidden">
      <GradientBackground />
      <Navbar />
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
                <BreadcrumbLink href={`/apps/${app.id}`}>
                  {app.id}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="mt-2 text-3xl font-semibold">{app.id}</h1>
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
                    <Label>IDP Entity ID</Label>
                    <div className="text-sm text-muted-foreground">
                      {appIdpEntityId(app)}
                    </div>
                  </div>

                  <div>
                    <Label>IDP Redirect URL</Label>
                    <div className="text-sm text-muted-foreground">
                      {appIdpRedirectUrl(app)}
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
              <CardContent>
                <SPSettingsForm app={app} />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>
                  SCIM Settings
                  <DocsLink to="https://ssoready.com/docs/dummyidp#scim-settings" />
                </CardTitle>
                <CardDescription>
                  Settings for directory syncing over SCIM. Optional.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SCIMSettingsForm app={app} />
              </CardContent>
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
                <UsersSettingsForm app={app} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
