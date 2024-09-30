"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { App } from "@/app/app";
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
import { upsertApp } from "@/app/actions";
import { toast } from "sonner";

const formSchema = z.object({
  domain: z.string().min(1, {
    message: "App domain is required.",
  }),
  users: z.array(
    z.object({
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Email must be a valid email" }),
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
    }),
  ),
});

export function UsersSettingsForm({ app }: { app: App }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: app.domain ?? "",
      users: app.users ?? [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await upsertApp({
      ...app,
      domain: values.domain,
      users: values.users,
    });

    toast.success("App SP settings updated");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="example.com" {...field} />
              </FormControl>
              <FormDescription>application domain</FormDescription>
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
