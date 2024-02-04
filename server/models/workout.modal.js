import mongoose from "mongoose";


const workoutSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    },
    plan: {
        type : String, // Link of the pdf of the diet
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

workoutModal.addNewWorkout = (newWorkout, successCallBack, errorCallBack, res) => {
    workoutModal.insertMany([newWorkout])
        .then(
            (dbRes) => {
                successCallBack(dbRes);
            },
            (dbErr) => {
                errorCallBack(dbErr);
            }
        )
        .catch((error) => {
            // exceptionHandler 
        })
}


export { workoutModal };