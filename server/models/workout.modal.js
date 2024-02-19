import mongoose from "mongoose";
import { apiError } from "../utils/apiError.js";
// import { userModal } from "./user.modal.js";

const workoutSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    },
    plan: {
        type : String, // Link of the pdf of the workout
        unique : true
    }
},{
    timestamps:true
})

const workoutModal = new mongoose.model("Workout", workoutSchema);

workoutModal.showAllWorkout = (successCallBack, errorCallBack, res) => {
    workoutModal.find()
        .then(
            (dbRes) => {successCallBack(dbRes)},
            (dbErr) => {errorCallBack(dbErr)}
        )
        .catch((error) => {
            // exceptionHandler
            // console.log(error);
            res.status(400).json(new apiError(501, "error while fetching workouts from db ",[error]))
        })
}

workoutModal.findWorkoutByID = (reqId, successCallBack, errorCallBack) =>{
    workoutModal.findById(reqId)
    .then(
      (dbRes) => {
        successCallBack(dbRes);
      },
      (dbErr) => {
        errorCallBack(dbErr);
      }
    )
    .catch((error) => {
      exceptionHandler(res, error);
    });
}

workoutModal.addNewWorkout = async (newWorkout) => {
	// console.log(userID);

    const workout=await workoutModal.create(newWorkout)
    if(!workout){
        // throw new apiError(501, "could not add workout in db")
        res.status(501).json(new ApiResponse(501,{}, "could not add workout in db"))
    }
    return workout
      
}

workoutModal.updateWorkout = (reqId, update, successCallBack, errorCallBack, res ) => {
    workoutModal.findByIdAndUpdate(reqId, update)
      .then(
        (dbRes) => {
          successCallBack(dbRes);
        },
        (dbErr) => {
          errorCallBack(dbErr);
        }
      )
      .catch((error) => {
        exceptionHandler(res, error);
      });
};

workoutModal.deleteWorkout = (reqId, successCallBack, errorCallBack, res) => {
    workoutModal.findByIdAndDelete(reqId)
      .then(
        (dbRes) => {
          successCallBack(dbRes);
        },
        (dbErr) => {
          errorCallBack(dbErr);
        }
      )
      .catch((error) => {
        exceptionHandler(res, error);
      });
};


export { workoutModal };