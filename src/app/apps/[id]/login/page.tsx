import Navbar from "@/components/Navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getApp } from "@/app/actions";
import { GradientBackground } from "@/components/GradientBackground";
import LoginCard from "@/app/apps/[id]/login/LoginCard";
import { Metadata } from "next";
import { DocsLink } from "@/components/DocsLink";

export const metadata: Metadata = {
  title: "Simulate SAML Login",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { SAMLRequest: string };
}) {
  const app = await getApp(params.id);
  if (app === undefined) {
    return <h1>not found</h1>;
  }

  const samlRequest = searchParams.SAMLRequest
    ? atob(searchParams.SAMLRequest)
    : "";

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
              <BreadcrumbSeparator />
              <BreadcrumbItem>Simulate SAML Login</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-2 text-3xl font-semibold">Simulate SAML login</h1>
          <p className="mt-1 text-muted-foreground">
            Simulate a SAML login as any user you've configured on this DummyIDP
            app.
            <DocsLink to="https://ssoready.com/docs/dummyidp#simulating-saml-logins" />
          </p>

          <LoginCard app={app} samlRequest={samlRequest} />
        </div>
      </div>
    </div>
  );
}
