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
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required." }),
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
    setLoading(true);

    setTimeout(async () => {
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
        subjectId: `${values.email}@${app.requiredDomain}`,
        firstName: values.firstName,
        lastName: values.lastName,
        spEntityId: app.spEntityId,
        sessionId: sessionId,
        now: now.format(),
        expire: expire.format(),
      });
      inputRef.current!.form!.action = app.spAcsUrl;
      inputRef.current!.form!.submit();
    }, 1000);
  }

  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex w-screen h-screen">
      <form method="post">
        <input type="hidden" name="SAMLResponse" ref={inputRef} />
      </form>

      <div className="m-auto max-w-xl relative">
        {loading && (
          <div className="absolute bg-black/80 inset-0 flex justify-center items-center z-10 dark text-white">
            <img className="m-auto" alt="loading" src="/loading.gif" />
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Log on</CardTitle>
            <CardDescription>
              Enter some details about who you want DummyIDP to say you are.
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
                        <div className="flex">
                          <Input
                            className="rounded-r-none"
                            placeholder="wouldyoulikehelp"
                            {...field}
                          />
                          <span className="inline-flex text-sm items-center rounded-r-md border border-l-0 border-input px-3 text-muted-foreground">
                            @{app.requiredDomain}
                          </span>
                        </div>
                      </FormControl>

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
                        <Input placeholder="Clippy" {...field} />
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
                        <Input placeholder="the Paperclip" {...field} />
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

            <Separator className="my-8" />

            <div className="text-xs text-muted-foreground space-y-2">
              <p>
                DummyIDP is a fake identity provider. It's a dummy stand-in for
                something like Okta, Google Workspace, or Microsoft Entra.
              </p>
              <p>
                In the real world, your customers would never see or interact
                with DummyIDP in any way. In the real world, your customers
                would see their own IDP, not this fake one.
              </p>
              <p>
                We made DummyIDP because there doesn't exist any free, no-hassle
                SAML Identity Provider out there that developers can test with.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
