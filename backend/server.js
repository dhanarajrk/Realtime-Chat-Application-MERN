import path from 'path';         //for deployment setup
import express from "express";
import { app, server } from "./socket/socket.js"; // imported const app = express(); from socket.js instead

import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000; //fetch the PORT number from .env

const __dirname = path.resolve();

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";

app.use(express.json()); // it is a middleware to parse incoming request with JSON payloads (from req.body)
app.use(cookieParser()); //to parse incoming cookies from req.cookies as needed in protectRoutes.js

app.use("/api/auth",authRoutes); //whenever /api/auth/... is written, authRoutes will route to the desire path as written in ./routes/auth.routes.js file. This makes code neat by maintaining get to another file
app.use("/api/messages", messageRoutes); //routes for message
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

//app.listen() wihtout socket io implementation
//server.listen() with socket io implementation
server.listen(PORT, ()=> {
  connectToMongoDB();
  console.log(`Server is running on ${PORT}`);
});