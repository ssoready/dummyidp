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

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { SAMLRequest: string };
}) {
  const app = await getApp(params.id);
  if (app === undefined) {
    return <h1>not found</h1>;
  }

  const samlRequest = searchParams ? atob(searchParams.SAMLRequest) : "";

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
            <CardContent>log in dude</CardContent>
          </Card>

          <Accordion className="mt-8 mx-auto max-w-2xl" type="multiple">
            <AccordionItem value="saml-request-details">
              <AccordionTrigger>SAML Request Details</AccordionTrigger>
              <AccordionContent>
                Here are details on the request DummyIDP received from your
                application.
                <code>
                  <pre>{samlRequest}</pre>
                </code>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
