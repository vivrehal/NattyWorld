import { userModal } from "../../models/user.modal.js";
import { workoutModal } from "../../models/workout.modal.js";

import express from "express";
const router = express.Router();

router.get("", (req, res) => {
    console.log("Getting Data");
    workoutModal.showAllWorkout(
        (dbRes) => {
            res.send(dbRes);
          },
          (dbErr) => {
            // res.status(400);
            // res.send({ name: dbErr.name, message: dbErr.message });
          },
        //   res
    );
})

router.post("", (req, res) => {
    workoutModal.addNewWorkout(
        {
            name: "Manik",
            plan: "Plans for workouts.."
        },
        (dbRes) => {
          res.send(dbRes);
        },
        (dbErr) => {
          res.status(400);
          res.send({ name: dbErr.name, message: dbErr.message });
        },
        res
    )
})

export {router};