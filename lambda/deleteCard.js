import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "ap-northeast-2" });

const documentClient = DynamoDBDocumentClient.from(client);

const tableName = "Cards";

export const handler = async (event) => {
  console.log("Received: " + JSON.stringify(event, null, 2));
  let response = "";
  try {
    const id = event.pathParameters.id;
    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };
    await documentClient.send(new DeleteCommand(params));
    response = {statusCode: 200,}
  } catch (err) {
    console.log(err)
    response = {
        statusCode: 500, 
        body: JSON.stringify({"Message" : err}),
    }
  } 
  return response;
};
