"use server";

import { redirect } from "next/navigation";
import * as libapp from "@/lib/app";

export async function createApp() {
  const id = await libapp.createApp();
  redirect(`/apps/${id}`);
}

export async function upsertApp(app: libapp.App): Promise<void> {
  await libapp.upsertApp(app);
}
