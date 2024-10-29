import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { XmlCodeBlock } from "@/components/XmlCodeBlock";
import formatXml from "xml-formatter";
import { App } from "@/lib/app";
import { useState } from "react";
import { DocsLink } from "@/components/DocsLink";

export default function LoginCard({
  app,
  samlRequest,
}: {
  app: App;
  samlRequest: string;
}) {
  const [assertion, setAssertion] = useState("");

  return (
    <div>
      <Card className="mt-8 mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            In a "real" IDP, this is the page where your customer puts in their
            corporate username and password. In DummyIDP, you can just choose
            who you want to log in as.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {app.users.length > 0 ? (
            <LoginForm
              app={app}
              samlRequest={samlRequest}
              onAssertionChange={setAssertion}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              Cannot log in with SAML, because this application doesn't have any
              users.{" "}
              <Link href={`/apps/${app.id}`} className="underline decoration-2">
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
                  Here are details on the request DummyIDP received from your
                  application.
                </p>

                <div className="mt-4">
                  <XmlCodeBlock code={formatXml(samlRequest)} />
                </div>
              </>
            ) : (
              <p>
                This is an IDP-initiated SAML login. AuthnRequests only apply to
                SP-initiated SAML logins.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="saml-assertion-preview">
          <AccordionTrigger>SAML Assertion Preview</AccordionTrigger>
          <AccordionContent>
            <p>
              A preview of the SAML assertion DummyIDP is going to send to your
              application.
            </p>

            {assertion && (
              <div className="mt-4">
                <XmlCodeBlock code={formatXml(atob(assertion))} />
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
