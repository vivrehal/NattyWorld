import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getDietFromAi, getWorkoutFromAi } from "../controllers/ai.controllers.js";


const router=Router();


router.route("/generateDiet").get(verifyJWT,getDietFromAi)
router.route("/generateWorkout").get(verifyJWT,getWorkoutFromAi)


export default router