import { NextApiRequest, NextApiResponse } from "next";
import { App, getApp, upsertApp } from "@/lib/app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      await GET(req, res);
      return;
    case "POST":
      await POST(req, res);
      return;
    default:
      res.status(405);
      return;
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query["id"] as string;

  const app = await getApp(id);
  if (!app) {
    res.status(404).send({});
  }

  res.status(200).json(app);
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const app = JSON.parse(req.body) as App;
  await upsertApp(app);
  res.status(200).send({});
}
