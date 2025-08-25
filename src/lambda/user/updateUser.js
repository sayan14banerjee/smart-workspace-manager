import { getItemByKey, putFunction } from "../../dbutils/dynamodbFunctions";
import { formatResponse } from "../../dbutils/response.js";


const USERS_TABLE = "Users"; // DynamoDB table name
const EMAIL_INDEX = "emailId-Index"; // GSI name for emailId
export const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const userId = data.userId;
    const updatedUserData = data;
    if (!userId) {
      return res.json(formatResponse(400, { error: "Username and Email are required" }));
    }
    // 1. Query using emailId-Index
    const userDetails = await getItemByKey(
      USERS_TABLE,
        { userId: userId })
    if (!userDetails) {
        return res.json(formatResponse(400, { error: "User  not found" }));

    }
    

    // 2. delete new user
    await putFunction(USERS_TABLE, updatedUserData);

    return res.json(formatResponse(200, { message: "User updated successfully" }));
  } catch (error) {
    console.error("Error in updateUser:", error);
    return res.json(formatResponse(500, { error: "Internal Server Error" }));
  }
};
