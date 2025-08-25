import { queryFunction, putFunction } from "../../dbutils/dynamodbFunctions";
import { v4 as uuidv4 } from "uuid";
import { formatResponse } from "../../dbutils/response.js";


const USERS_TABLE = "Users"; 
const EMAIL_INDEX = "emailId-Index"; 

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const { emailId, name } = data;
    console.log("Received data:", data);

    if (!emailId || !name) {
      return res.json(formatResponse(400, { error: "Username and Email are required" }));
    }

    // 1. Check if user exists by email
    const existingUser = await queryFunction(
      USERS_TABLE,
      "emailId = :emailId",
      { ":emailId": emailId },
      EMAIL_INDEX
    );
    console.log("Existing user check:", existingUser);

    if (existingUser.Items && existingUser.Items.length > 0) {
      return res.json(formatResponse(400, { error: "User Already exist" }));

    }

    // 2. Create new user
    const userId = uuidv4(); 
    const newUser = { ...data, userId };

    console.log("New user data:", newUser);
    await putFunction(USERS_TABLE, newUser);

     return res.json(formatResponse(200, { message: "User created successfully" }));
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.json(formatResponse(500, { error: "Internal Server Error" }));
  }
  
};
