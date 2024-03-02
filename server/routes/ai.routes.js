import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getDietFromAi, getWorkoutFromAi } from "../controllers/ai.controllers.js";


const router=Router();


router.route("/generateDiet").post(verifyJWT, getDietFromAi)
router.route("/generateWorkout").post(verifyJWT,getWorkoutFromAi) 


export default router