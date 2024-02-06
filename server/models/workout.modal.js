import mongoose from "mongoose";


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
            console.log(error);
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

workoutModal.addNewWorkout = (newWorkout, successCallBack, errorCallBack, res) => {
    let currID ;
    workoutModal.collection.insertOne(newWorkout)
        .then(
            (dbRes) => {
                successCallBack(dbRes);
                currID = dbRes.insertedId.toString();
            },
            (dbErr) => {
                errorCallBack(dbErr);
            }
        )
        .catch((error) => {
            // exceptionHandler 
            console.log(error);
        })
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