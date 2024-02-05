import express from "express";
// import { addDiet, getAllDiets, getDietById, updateDiet, deleteDiet } from "../controllers/diet.controller.js";
import { getAllDiets, getDietById, addDiet } from "../controllers/diet.controller.js";
const dietRouter = express.Router();

// console.log("In routes")
dietRouter.route("/dietList").get(getAllDiets);

dietRouter.route("/dietList/:reqID").get(getDietById);

dietRouter.route("/addDiet").post(addDiet);

// router.route("/updateDiet/:reqID").put(updateDiet)

// router.route("/deleteDiet/:reqID").delete(deleteDiet)

export default dietRouter;