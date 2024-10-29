import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { App, appIdpEntityId, AppUser } from "@/lib/app";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useMemo, useRef, useState } from "react";
import { encodeAssertion } from "@/lib/saml";
import moment from "moment";
import { XmlCodeBlock } from "@/components/XmlCodeBlock";
import formatXml from "xml-formatter";
import { INSECURE_PRIVATE_KEY } from "@/lib/insecure-cert";

const FormSchema = z.object({
  userIndex: z.string({
    required_error: "Please select a user to proceed as.",
  }),
});

export function LoginForm({
  app,
  samlRequest,
  onAssertionChange,
}: {
  app: App;
  samlRequest: string;
  onAssertionChange: (assertion: string) => void;
}) {
  const sessionId = useMemo(() => {
    if (samlRequest === "") {
      return "";
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(samlRequest, "text/xml");

    // use xpath to get the AuthnRequest ID, throwing away all namespace information to make that easier
    return doc.evaluate(
      "string(/_:AuthnRequest/@ID)",
      doc,
      () => "urn:oasis:names:tc:SAML:2.0:protocol",
      XPathResult.STRING_TYPE,
      null,
    ).stringValue;
  }, [samlRequest]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { userIndex: "0" },
  });

  const userIndex = form.watch("userIndex");
  const user = useMemo(() => {
    return app.users[parseInt(userIndex)];
  }, [app, userIndex]);

  const [assertion, setAssertion] = useState("");
  useEffect(() => {
    (async () => {
      const key = await window.crypto.subtle.importKey(
        "jwk",
        JSON.parse(atob(INSECURE_PRIVATE_KEY)),
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-256",
        },
        true,
        ["sign"],
      );

      const now = moment(new Date()).add(-1, "hour");
      const expire = moment(new Date()).add(1, "hour");

      setAssertion(
        await encodeAssertion(key, {
          assertionId: crypto.randomUUID(),
          idpEntityId: appIdpEntityId(app),
          subjectId: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          spEntityId: app.spEntityId!,
          sessionId: sessionId,
          now: now.format(),
          expire: expire.format(),
        }),
      );
    })();
  }, [userIndex]);

  useEffect(() => {
    onAssertionChange(assertion);
  }, [assertion]);

  const inputRef = useRef<HTMLInputElement>(null);
  function handleSubmit(data: z.infer<typeof FormSchema>) {
    inputRef.current!.value = assertion;
    inputRef.current!.form!.action = app.spAcsUrl!;
    inputRef.current!.form!.submit();
  }

  return (
    <div>
      <form method="post">
        <input type="hidden" name="SAMLResponse" ref={inputRef} />
      </form>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="userIndex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proceed As</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user to proceed as" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {app.users.map((user, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {user.firstName} {user.lastName} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select a user that you want to log in with SAML as.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Proceed as {user.email}</Button>
        </form>
      </Form>
    </div>
  );
}
