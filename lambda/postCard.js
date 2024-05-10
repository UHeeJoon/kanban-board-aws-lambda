import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const documentClient = DynamoDBDocumentClient.from(client);

const tableName = "Cards";

export const handler = async event => {
console.log("Received: " + JSON.stringify(event, null, 2));
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
  };

  try {
    const id = event.requestContext.requestId;
    let requestJSON = JSON.parse(event.body);
    let params = {
        TableName: tableName,
        Item: {
          id: id,
          title: requestJSON.title,
          category: requestJSON.category,
        },
    }
    await documentClient.send(
      new PutCommand(params)
    );
    body =  { id };
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    headers,
    body,
  };
};
