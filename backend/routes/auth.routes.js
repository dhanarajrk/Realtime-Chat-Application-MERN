import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"; //get functions are fetched from another file with each function name to make it look clean

const router = express.Router();


router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

export default router;