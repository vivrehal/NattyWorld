import { workoutModal } from "../../models/workout.modal.js";
import mongoose from "mongoose";
import express from "express";
const router = express.Router();

router.get("", (req, res) => {
    console.log("Getting Data");
    workoutModal.showAllWorkout(
        (dbRes) => {
            res.send(dbRes);
          },
          (dbErr) => {
            res.status(400);
            res.send({ name: dbErr.name, message: dbErr.message });
          },
          res
    );
})

router.get("/:reqID", async (req, res) => {
  console.log("Getting Workout");
  let reqID = req.params.reqID;
  if (!mongoose.Types.ObjectId.isValid(reqID)) {
    res.status(400);
    res.send({ message: "Record does not exist" });
    res.end();
    return;
  }
  workoutModal.findWorkoutByID(
    reqID,
    (dbRes) => {
      if (dbRes) {
        res.send(dbRes);
      } else {
        res.status(404);
        res.send({ message: "Record does not exist" });
      }
    },
    (dbErr) => {
      res.status(400);
      res.send({ name: dbErr.name, message: dbErr.message });
    },
    res
  );
})

router.post("", (req, res) => {
    let newWorkout = req.body;
    workoutModal.addNewWorkout(
        newWorkout,
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