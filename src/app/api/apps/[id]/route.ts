import { NextRequest, NextResponse } from "next/server";

import { getApp } from "@/app/app";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const app = await getApp(params.id);
  return new NextResponse(JSON.stringify(app), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
