import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "ap-northeast-2" });

const documentClient = DynamoDBDocumentClient.from(client);

const tableName = "Cards";

export const handler = async (event) => {
  console.log("Received: " + JSON.stringify(event, null, 2));
  try {
    const requestJSON = JSON.parse(event.body);
    const id = event.pathParameters.id;
    const params = {
      TableName: tableName,
      Key: {
        id,
      },
      UpdateExpression: "set #t = :title, #c = :category",
      ExpressionAttributeNames: {
        "#t": "title",
        "#c": "category",
      },
      ExpressionAttributeValues: {
        ":title": requestJSON.title,
        ":category": requestJSON.category,
      },
      ReturnValues: "NONE",
    };
    await documentClient.send(new UpdateCommand(params));
  } catch (err) {
    console.log(err)
  } 
  return {
    statusCode:204,
    headers: {
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    }
  }
};
