// src/routes/userRoutes.js
import express from "express";
import { createUser } from "../lambda/user/createUser.js";
import { deleteUser } from "../lambda/user/deleteUser.js";
// import { listUsers } from "../lambda/user/userList";
import { updateUser } from "../lambda/user/updateUser.js";

const router = express.Router();

// Create user
router.post("/createUser", createUser);

// Delete user
router.post("/deleteUser", deleteUser);

// List users
// router.get("/createUser", listUsers);

// Update user
router.post("/updateUser", updateUser);

export default router;
