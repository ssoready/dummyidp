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
  spAcsUrl: z.string().min(1, {
    message: "Service Provider ACS URL is required.",
  }),
  spEntityId: z.string().min(1, {
    message: "Service Provider Entity ID is required.",
  }),
});

export function SPSettingsForm({ app }: { app: App }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spAcsUrl: app.spAcsUrl ?? "",
      spEntityId: app.spEntityId ?? "",
    },
  });

  const upsertApp = useUpsertApp();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await upsertApp.mutateAsync({
      ...app,
      spAcsUrl: values.spAcsUrl,
      spEntityId: values.spEntityId,
    });

    toast.success("App SP settings updated");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="spAcsUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SP ACS URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              {/*<FormDescription>sp acs url</FormDescription>*/}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="spEntityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SP Entity ID</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              {/*<FormDescription>sp acs url</FormDescription>*/}
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
