import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const url = req.nextUrl.clone();
  url.pathname = `/apps/${params.id}/login`;
  url.search = new URLSearchParams((await req.formData()) as any).toString();
  return NextResponse.redirect(url, 302);
}
