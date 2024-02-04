import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";

const router=Router();

export default router

router.route("/register").post(registerUser)