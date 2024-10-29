"use server";

import { kv } from "@vercel/kv";
import { redirect } from "next/navigation";
import { ulid } from "ulid";
import { App } from "@/lib/app";

export async function createApp() {
  const id = `app_${ulid().toLowerCase()}`;
  await kv.hset(id, {
    id,
    users: [
      { email: "john.doe@example.com", firstName: "John", lastName: "Doe" },
      {
        email: "abraham.lincoln@example.com",
        firstName: "Abraham",
        lastName: "Lincoln",
      },
    ],
  });
  redirect(`/apps/${id}`);
}

export async function getApp(id: string): Promise<App | undefined> {
  const result = await kv.hgetall(id);
  if (!result) {
    return undefined;
  }

  return result as unknown as App;
}
