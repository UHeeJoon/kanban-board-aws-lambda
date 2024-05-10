import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);
const tableName = "Cards";

export const handler = async event => {
  console.log("Received: " + JSON.stringify(event, null, 2));
  let statusCode = 200;
  let body;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
  };
  
  try {
    const cards = await documentClient.send(
      new ScanCommand({TableName: tableName})
    );
    body = cards.Items;
  } catch (exception) {
    console.error(exception);
    statusCode = 500;
    body = { "Message: ": exception };
  } finally {
    body = JSON.stringify(body);
  }
  return {
    statusCode,
    headers,
    body,
  };
};
