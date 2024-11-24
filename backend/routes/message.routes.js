import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../../middleware/protectRoutes.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);  //:id is not :userId, it is a message id  //only those that can pass protectRoutes can execute sendMessage

router.get("/:id", protectRoute, getMessage); // this is GET method because we want to get the message between current user and receiver(:id)

export default router;