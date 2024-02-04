import express from "express";
import { addWorkout, getAllWorkouts, getWorkoutById } from "../controllers/workout.controller.js";
const router = express.Router();

router.route("/workoutList").get(getAllWorkouts)

router.route("workoutList/:reqID").get(getWorkoutById)

router.route("/addWorkout").post(addWorkout)

export default router;