import { Router } from "express";
import { findNearbyGyms } from "../controllers/gym.controllers.js";
const router = Router()

router.route("/findNearby").post(findNearbyGyms)


export default router