import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateUser,
       deleteUser, newTokenOnExpiry, getUserById,
       getUserAuthStatus, getUserWorkouts, getUserDiets, updateProfile, sendOtp, verifyOtp }
       from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router=Router();


router.route("/register").post(registerUser) 
router.route("/login").post(loginUser)

// secured routes
router.route("/updateUser/:reqID").put(verifyJWT,updateUser)
router.route("/updateProfile/:reqID").put(verifyJWT,updateProfile)
router.route("/deleteUser/:reqID").delete(verifyJWT,deleteUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/getAuthStatus").post(getUserAuthStatus)
router.route("/refresh_token").post(newTokenOnExpiry)

router.route("/getUserWorkouts").post(verifyJWT, getUserWorkouts);
router.route("/getUserDiets").post(verifyJWT, getUserDiets);

router.route("/getUser/:reqID").get(verifyJWT, getUserById)

router.route("/sendOtp").post(sendOtp)  
router.route("/verifyOtp").post(verifyOtp)  

export default router