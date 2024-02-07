import { asyncHandler } from "../utils/asyncHandler.js";
import { workoutModal } from "../models/workout.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { apiError } from "../utils/apiError.js"
import { userModal } from "../models/user.modal.js";
import mongoose from "mongoose";

const getAllWorkouts=asyncHandler(async(req, res) => {
    console.log("Getting Data");
    workoutModal.showAllWorkout(
        (dbRes) => {
            return res.status(200).json(new ApiResponse(200,dbRes,"Workout retrieved successfully"))
          },
          (dbErr) => {
            throw new apiError(400,"error while fetching workouts from db",[dbErr])
          },
    );
})

const getWorkoutById=asyncHandler(async (req, res) => {
    console.log("Getting Workout");
    let reqID = req.params.reqID;
    // console.log(reqID)
    if (!mongoose.Types.ObjectId.isValid(reqID)) {
      res.status(400);
      res.json({ message: "Record does not exist" });
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
          res.json({ message: "Record does not exist" });
        }
      },
      (dbErr) => {
        res.status(400);
        res.json({ name: dbErr.name, message: dbErr.message });
      },
    );
})
  
const addWorkout=asyncHandler(async(req, res) => {
	// console.log(req.user)
    const newWorkout = req.body;
	const user=req.user

	const workout=await workoutModal.addNewWorkout(
		newWorkout
	)

	if(!workout){
		throw new apiError(502, "could not add workout to db from model method")
	}

	// Adding the workoutID to user's workout array
	user.workouts.push(workout._id);

	const newUser=await userModal.findByIdAndUpdate(
        user._id,
        {
            $set: {
                workouts:user.workouts
            }
        },
        {
            new:true
        }
    )

	if(!newUser){
		throw new apiError(501, "cannot add workout in userSchema")
	}

	res
	.status(201)
	.json(
		new ApiResponse(201,newUser.workouts,"added workout in user workout list")
	)

})

const updateWorkout = asyncHandler(async(req, res) => {
	console.log("Updating Workout");
	let reqID = req.params.reqID;
	let newWorkout = req.body;
	console.log(reqID + " " + newWorkout);

	if (!mongoose.Types.ObjectId.isValid(reqID)) {
	  res.status(400);
	  res.send({ message: "Record does not exist" });
	  res.end();
	  return;
	}
  
	workoutModal.updateWorkout(
	  reqID,
	  newWorkout,
	  (dbRes) => {
		if (dbRes) {
		  res.send({ message: "Record updated successfully" });
		} else {
		  res.status(400);
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

const deleteWorkout = asyncHandler( async(req, res) => {
	let reqID = req.params.reqID;

	if (!mongoose.Types.ObjectId.isValid(reqID)) {
	  res.status(400);
	  res.send({ message: "Record does not exist" });
	  res.end();
	  return;
	}
  
	workoutModal.deleteWorkout(
	  reqID,
	  (dbRes) => {
		if (dbRes) {
		  res.send({ message: "Record deleted successfully" });
		} else {
		  res.status(400);
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

export {getAllWorkouts, getWorkoutById, addWorkout, updateWorkout, deleteWorkout}