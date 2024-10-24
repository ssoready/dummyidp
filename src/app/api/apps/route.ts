import { NextRequest, NextResponse } from "next/server";

import { upsertApp } from "@/app/app";

export async function POST(req: NextRequest) {
  const app = await req.json();
  await upsertApp(app);
  return new NextResponse();
}
