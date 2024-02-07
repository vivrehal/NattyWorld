import { Router } from "express";
import { findNearbyGyms } from "../controllers/gym.controllers.js";
const router = Router()

router.route("/findNearby").get(findNearbyGyms)


export default router