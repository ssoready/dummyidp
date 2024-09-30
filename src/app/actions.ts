"use server";

import { kv } from "@vercel/kv";
import { redirect } from "next/navigation";
import { ulid } from "ulid";
import { App } from "@/app/app";

export async function createApp() {
  const id = `app_${ulid().toLowerCase()}`;
  await kv.hset(id, { id });
  redirect(`/apps/${id}`);
}

export async function getApp(id: string): Promise<App | undefined> {
  const result = await kv.hgetall(id);
  if (!result) {
    return undefined;
  }

  return result as unknown as App;
}

export async function upsertApp(app: App): Promise<void> {
  await kv.hset(app.id, app);
}
