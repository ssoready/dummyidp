"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { App } from "@/lib/app";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUpsertApp } from "@/lib/hooks";

const formSchema = z.object({
  scimBaseUrl: z
    .string()
    .min(1, {
      message: "SCIM Base URL is required.",
    })
    .url({
      message: "SCIM Base URL must be a valid URL.",
    }),
  scimBearerToken: z.string().min(1, {
    message: "A SCIM Bearer Token is required.",
  }),
});

export function SCIMSettingsForm({ app }: { app: App }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scimBaseUrl: app.scimBaseUrl ?? "",
      scimBearerToken: app.scimBearerToken ?? "",
    },
  });

  const upsertApp = useUpsertApp();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await upsertApp.mutateAsync({
      ...app,
      scimBaseUrl: values.scimBaseUrl,
      scimBearerToken: values.scimBearerToken,
    });

    toast.success("App SCIM settings updated");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="scimBaseUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SCIM Base URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scimBearerToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SCIM Bearer Token</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving" : "Save"}
        </Button>
      </form>
    </Form>
  );
}
