import express from "express";
import { addWorkout, getAllWorkouts, getWorkoutById, updateWorkout, deleteWorkout } from "../controllers/workout.controllers.js";
const router = express.Router();

router.route("/workoutList").get(getAllWorkouts)

router.route("/workoutList/:reqID").get(getWorkoutById)

router.route("/addWorkout").post(addWorkout)

router.route("/updateWorkout/:reqID").put(updateWorkout)

router.route("/deleteWorkout/:reqID").delete(deleteWorkout)

export default router;