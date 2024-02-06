import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getDietFromAi, getWorkoutFromAi } from "../controllers/ai.controllers.js";


const router=Router();


router.route("/generateDiet").get(getDietFromAi)
router.route("/generateWorkout").get(getWorkoutFromAi)


export default router