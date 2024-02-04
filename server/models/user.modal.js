import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    },
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username is not unique"],
        lowercase:true,
        trim:true,
    },
    email : {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        lowercase: true
    },
    password : {
        type: String,
        required: [true,"Password is required"],
        unique: true,
   },
    dob : {
        type: Date,
        required: true,
        unique: true,
        lowercase: true
    },
    workouts : [{
        type: mongoose.Schema.ObjectId,
        ref : "Workout"
    }],
    diets : [{
        type: mongoose.Schema.ObjectId,
        ref : "Diet"
    }],
    currentWorkout:{
        type: mongoose.Schema.ObjectId,
        ref : "Workout"
    },
    currentDiet:{
        type: mongoose.Schema.ObjectId,
        ref : "Diet"
    },
    refreshToken:{
        type: String
    }

},{
    timestamps:true
})

// export const WorkoutModel
const userModal = new mongoose.model("User", userSchema);
// module.exports = { userModal };
export { userModal };