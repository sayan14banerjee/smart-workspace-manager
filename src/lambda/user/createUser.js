const AWS = require("aws-sdk");
import { queryFunction, putFunction } from "../../dbutils/dynamodbFunctions";

USERS_TABLE = "user_table"; // DynamoDB table name
EMAIL_INDEX = "emailId-Index"; // GSI name for emailId
module.exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const { emailId, name } = data;

    if (!emailId || !name) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing fields" }) };
    }
    // 1. Query using emailId-Index
    const existingUser = await queryFunction(
      USERS_TABLE,
      "emailId = :emailId",
      { ":emailId": emailId },
      EMAIL_INDEX
    );
    if (existingUser.Items.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "User already exists with this email" })
      };
    }

    // 2. Create new user
    const userId = Date.now().toString(); // or uuid
    const newUser = { userId, emailId, name };

    await dynamoDb.put({
      USERS_TABLE,
      newUser
    }).promise();

    return { statusCode: 201, body: JSON.stringify(newUser) };

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
