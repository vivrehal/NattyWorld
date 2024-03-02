import express from "express";
import {getAllDiets, getDietById, addDiet, updateDiet, deleteDiet} from "../controllers/diet.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const dietRouter = express.Router();

// console.log("In routes")
dietRouter.route("/dietList").get(getAllDiets);

dietRouter.route("/dietList/:reqID").get(verifyJWT, getDietById);

dietRouter.route("/addDiet").post(verifyJWT, addDiet);

dietRouter.route("/updateDiet/:reqID").put(updateDiet)

dietRouter.route("/deleteDiet/:reqID").delete(deleteDiet) 

export default dietRouter;