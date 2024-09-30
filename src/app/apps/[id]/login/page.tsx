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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LoginForm } from "@/app/apps/[id]/login/LoginForm";
import Link from "next/link";
import { XmlCodeBlock } from "@/components/XmlCodeBlock";
import formatXml from "xml-formatter";

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
              <BreadcrumbSeparator />
              <BreadcrumbItem>Login</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-2 text-3xl font-semibold">Log in via SAML</h1>

          <Card className="mt-8 mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle>Log in</CardTitle>
            </CardHeader>
            <CardContent>
              {app.users.length > 0 ? (
                <LoginForm app={app} samlRequest={samlRequest} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Cannot log in with SAML, because this application doesn't have
                  any users.{" "}
                  <Link
                    href={`/apps/${params.id}`}
                    className="underline decoration-2"
                  >
                    Edit this application
                  </Link>{" "}
                  to add users, and then try here again.
                </p>
              )}
            </CardContent>
          </Card>

          <Accordion className="mt-8 mx-auto max-w-2xl" type="multiple">
            <AccordionItem value="saml-request-details">
              <AccordionTrigger>
                Service Provider AuthnRequest Details
              </AccordionTrigger>
              <AccordionContent>
                {samlRequest ? (
                  <>
                    <p>
                      Here are details on the request DummyIDP received from
                      your application.
                    </p>

                    <div className="mt-4">
                      <XmlCodeBlock code={formatXml(samlRequest)} />
                    </div>
                  </>
                ) : (
                  <p>
                    This is an IDP-initiated SAML login. AuthnRequests only
                    apply to SP-initiated SAML logins.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
