import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuid } from "uuid";

import { document } from "src/utils/dynamodbClient";

interface ICreateTodo {
  id: string;
  user_id: string;
  title: string;
  deadline: Date;
  done: boolean;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  await document.put({
    TableName: 'todos',
    Item: {
      id: uuid(),
      user_id,
      title,
      deadline: new Date(deadline).toDateString(),
      done: false
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo created!'
    })
  }
}