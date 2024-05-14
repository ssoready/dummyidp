import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useStore } from "@/lib/store";
import { useParams } from "react-router";
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
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { GLOBAL_NONSECURE_CERT } from "@/key";
import { Link } from "react-router-dom";

const formSchema = z.object({
  spAcsUrl: z
    .string()
    .url({ message: "Service Provider ACS URL must be a valid URL." }),
  spEntityId: z.string(),
});

export function ViewAppPage() {
  const [storeData, setStoreData] = useStore();
  const { appId } = useParams();
  const app = storeData.apps[appId!];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spAcsUrl: app.spAcsUrl,
      spEntityId: app.spEntityId,
    },
  });

  const [open, setOpen] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();

    setStoreData({
      ...storeData,
      apps: {
        ...storeData.apps,
        [app.id]: {
          ...storeData.apps[app.id],
          spAcsUrl: values.spAcsUrl,
          spEntityId: values.spEntityId,
        },
      },
    });

    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1.5">
              <div className="flex gap-4">
                <CardTitle>App</CardTitle>

                <span className="text-xs font-mono bg-gray-100 py-1 px-2 rounded-sm">
                  {app.id}
                </span>
              </div>
              <CardDescription>
                This is a dummy app. This is a dumbed-down equivalent to an
                app/tile in Okta, Google Workspace, Microsoft Entra, etc.
              </CardDescription>
            </div>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Edit</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Edit app</AlertDialogTitle>
                  <AlertDialogDescription>
                    Edit the settings associated with this dummy SSO app.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="spAcsUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Provider ACS URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            This tells DummyIDP where to redirect people when
                            they want to log in to this app. Okta calls this a
                            "Single sign-on URL".
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="spEntityId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Provider Entity ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            This tells DummyIDP what the "ID" of the app is when
                            doing a SAML sign-on. Okta calls this "Audience URI
                            (SP Entity ID)".
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button type="submit">Submit</Button>
                    </AlertDialogFooter>
                  </form>
                </Form>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-4 gap-y-2">
            <div className="text-sm col-span-1 text-muted-foreground">
              Service Provider ACS URL
            </div>
            <div className="text-sm col-span-3">{app.spAcsUrl}</div>
            <div className="text-sm col-span-1 text-muted-foreground">
              Service Provider Entity ID
            </div>
            <div className="text-sm col-span-3">{app.spEntityId}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Start SAML login</CardTitle>
          <CardDescription>
            Click the button below to do the equivalent of clicking on an
            app/tile in Okta, Google Workspace, Microsoft Entra, etc.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild>
            <Link to={`/apps/${app.id}/sso`}>Sign on</Link>
          </Button>

          <p className="mt-8 text-sm text-muted-foreground">
            This will perform a SAML IDP-initiated flow, meaning you'll be
            redirected to the Service Provider ACS URL, which you've configured
            as <span className="font-semibold">{app.spAcsUrl}</span>.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Identity Provider settings</CardTitle>
          <CardDescription>
            These are settings that the identity provider (i.e. DummyIDP, in
            this case) chooses.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-4 gap-y-2">
            <div className="text-sm col-span-1 text-muted-foreground">
              Identity Provider Sign-on URL
            </div>
            <div className="text-sm col-span-3">
              https://dummyidp.com/apps/{app.id}/sso
            </div>
            <div className="text-sm col-span-1 text-muted-foreground">
              Identity Provider Entity ID
            </div>
            <div className="text-sm col-span-3">
              https://dummyidp.com/apps/{app.id}
            </div>
            <div className="text-sm col-span-4 text-muted-foreground">
              Certificate
            </div>
            <div className="col-span-4">
              <div className="bg-black rounded-lg px-6 py-4 inline-block">
                <code className="text-sm text-white">
                  <pre>{GLOBAL_NONSECURE_CERT}</pre>
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
