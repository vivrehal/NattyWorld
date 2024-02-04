const mogoose = require("mongoose");

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
        type: mogoose.Schema.ObjectId,
        ref : "Workout"
    }],
    diets : [{
        type: mogoose.Schema.ObjectId,
        ref : "Diet"
    }],
    currentWorkout:{
        type: mogoose.Schema.ObjectId,
        ref : "Workout"
    },
    currentDiet:{
        type: mogoose.Schema.ObjectId,
        ref : "Diet"
    },
    weight:{
        type: Number,
        required: true,
        validate:{
            validator: Number.isInteger,
            message: `{VALUE} is not an number`
        }
    },
    height:{
        type: Number,
        required: true,
        validate:{
            validator: Number.isInteger,
            message: `{VALUE} is not an number`
        }
    },
    refreshToken:{
        type: String
    }

},{
    timestamps:true
})

// export const WorkoutModel
const userModal = new mogoose.model("User", userSchema);
module.exports = { userModal };