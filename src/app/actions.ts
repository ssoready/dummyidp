"use server";

import { randomUUID } from "node:crypto";
import { kv } from "@vercel/kv";
import { redirect } from "next/navigation";

export interface App {
  id: string;
  spAcsUrl?: string;
  spEntityId?: string;
}

export async function createApp() {
  const id = randomUUID();
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
