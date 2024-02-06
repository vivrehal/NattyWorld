import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getDietFromAi } from "../controllers/ai.controllers.js";


const router=Router();


router.route("/generateDiet").get(getDietFromAi)


export default router