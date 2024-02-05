import express from "express";
// import { addDiet, getAllDiets, getDietById, updateDiet, deleteDiet } from "../controllers/diet.controller.js";
import { getAllDiets, getDietById, addDiet } from "../controllers/diet.controller.js";
const router = express.Router();

// console.log("In routes")
router.route("/dietList").get(getAllDiets)

router.route("/dietList/:reqID").get(getDietById)

router.route("/addDiet").post(addDiet)

// router.route("/updateDiet/:reqID").put(updateDiet)

// router.route("/deleteDiet/:reqID").delete(deleteDiet)

export default router;