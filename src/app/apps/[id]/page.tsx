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

export default async function Page({ params }: { params: { id: string } }) {
  const app = await getApp(params.id);
  if (app === undefined) {
    return <h1>not found</h1>;
  }

  const certificateDownloadURL = `data:text/plain,${process.env.INSECURE_PUBLIC_CERTIFICATE}`;

  return (
    <div>
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

          <h1 className="mt-2 text-3xl font-semibold">{app.id}</h1>

          <div className="grid grid-cols-2 gap-x-4">
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>
                  SAML IDP Settings
                  <DocsLink to="https://ssoready.com/docs/dummyidp#app-saml-idp-settings" />
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
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>
                  SAML SP Settings
                  <DocsLink to="https://ssoready.com/docs/dummyidp#app-saml-sp-settings" />
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
          </div>
        </div>
      </div>
    </div>
  );
}

function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={
          "absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] rotate-[-10deg] rounded-full blur-3xl"
        }
      />
    </div>
  );
}
