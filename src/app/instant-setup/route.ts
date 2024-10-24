import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { upsertApp } from "@/app/app";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const appId = searchParams.get("appId")!;
  const spAcsUrl = searchParams.get("spAcsUrl")!;
  const spEntityId = searchParams.get("spEntityId")!;
  const email = searchParams.get("email")!;
  const firstName = searchParams.get("firstName")!;
  const lastName = searchParams.get("lastName")!;

  await upsertApp({
    id: appId,
    spAcsUrl: spAcsUrl,
    spEntityId: spEntityId,
    users: [{ email, firstName, lastName }],
  });

  redirect(`/apps/${appId}/login`);
}
