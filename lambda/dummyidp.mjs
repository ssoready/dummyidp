import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export async function handler(event) {
  let body = event.body;
  if (event.isBase64Encoded) {
    body = Buffer.from(body, "base64").toString("utf-8");
  }

  if (event.rawPath.startsWith("/saml-init")) {
    const appId = event.rawPath.split("/")[2];

    return {
      statusCode: 302,
      headers: {
        Location: `https://dummyidp.com/apps/${appId}/sso?${body}`,
      },
    };
  }

  if (event.rawPath.startsWith("/api/set-app-config")) {
    const { appId, ...config } = JSON.parse(body);

    await docClient.send(
      new PutCommand({
        TableName: "dummyidp",
        Item: {
          pk: appId,
          v: config,
        },
      }),
    );

    return { statusCode: 200 };
  }

  if (event.rawPath.startsWith("/api/get-app-config")) {
    const { appId } = JSON.parse(body);

    const { Item: item } = await docClient.send(
      new GetCommand({
        TableName: "dummyidp",
        Key: {
          pk: appId,
        },
      }),
    );

    const { v } = item;

    return {
      statusCode: 200,
      body: JSON.stringify({
        appId,
        config: v,
      }),
    };
  }

  return { statusCode: 404 };
}
