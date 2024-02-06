import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateUser, deleteUser } from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router=Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/updateUser/:reqID").put(updateUser)
router.route("/deleteUser/:reqID").delete(deleteUser)
// secured routes
router.route("/logout").post(verifyJWT ,logoutUser)
router.route("/refresh_token").post(logoutUser)

export default router