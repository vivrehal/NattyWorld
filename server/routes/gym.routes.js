import { Router } from "express";
import { findNearbyGyms } from "../controllers/gym.controllers.js";
import  verifyJWT  from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/findNearby").post(verifyJWT, findNearbyGyms)


export default router 