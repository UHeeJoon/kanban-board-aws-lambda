import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "ap-northeast-2" });

const documentClient = DynamoDBDocumentClient.from(client);

const tableName = "Cards";

export const handler = async (event) => {
  console.log("Received: " + JSON.stringify(event, null, 2));
  let statusCode = 204;
  let headers =  {
    "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
  }
  let body = "";
  try {
    const id = event.pathParameters.id;
    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };
    await documentClient.send(new DeleteCommand(params));
  } catch (err) {
      console.log(err)
      statusCode= 500;
  } 
  return {
    statusCode,
    headers,
    body
  };
};
