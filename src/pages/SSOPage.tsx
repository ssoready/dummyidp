import React, { useEffect, useRef, useState } from "react";
import { encodeAssertion } from "@/lib/saml";
import { GLOBAL_NONSECURE_KEY } from "@/key";
import { useStore } from "@/lib/store";
import { useParams } from "react-router";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { clsx } from "clsx";

const formSchema = z.object({
  email: z.string().email({ message: "Email must be a well-formed email." }),
  firstName: z.string(),
  lastName: z.string(),
});

export function SSOPage() {
  const [storeData, _] = useStore();
  const { appId } = useParams();
  const app = storeData.apps[appId!];

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const samlRequest = searchParams.get("SAMLRequest");

  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    if (!samlRequest) {
      return;
    }

    const samlRequestXML = atob(
      // url to std base64
      samlRequest.replace(/-/g, "+").replace(/_/g, "/"),
    );

    const parser = new DOMParser();
    const doc = parser.parseFromString(samlRequestXML, "text/xml");

    // use xpath to get the AuthnRequest ID, throwing away all namespace information to make that easier
    const id = doc.evaluate(
      "string(/_:AuthnRequest/@ID)",
      doc,
      (_) => "urn:oasis:names:tc:SAML:2.0:protocol",
      XPathResult.STRING_TYPE,
      null,
    ).stringValue;

    setSessionId(id);
  }, [samlRequest]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email ?? "",
      firstName: firstName ?? "",
      lastName: lastName ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    const key = await window.crypto.subtle.importKey(
      "jwk",
      GLOBAL_NONSECURE_KEY,
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      true,
      ["sign"],
    );

    const now = moment(new Date()).add(-1, "hour");
    const expire = moment(new Date()).add(1, "hour");

    inputRef.current!.value = await encodeAssertion(key, {
      idpEntityId: `https://dummyidp.com/apps/${app.id}`,
      subjectId: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      spEntityId: app.spEntityId,
      sessionId: sessionId,
      now: now.format(),
      expire: expire.format(),
    });
    inputRef.current!.form!.action = app.spAcsUrl;
    inputRef.current!.form!.submit();
  }

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form method="post">
        <input type="hidden" name="SAMLResponse" ref={inputRef} />
      </form>

      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Log on</CardTitle>
          <CardDescription>
            Enter some details about who you want DummyIDP to log you in as.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>

                    {email && (
                      <FormDescription>
                        You'll want to keep this as a{" "}
                        <span className="font-semibold">
                          {email.split("@")[1]}
                        </span>{" "}
                        email address, otherwise your login will probably be
                        rejected by {new URL(app.spAcsUrl).hostname}.
                      </FormDescription>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 col-span-2">
                <Button
                  className={clsx(
                    "w-full",
                    email &&
                      "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl",
                  )}
                >
                  Log on
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
