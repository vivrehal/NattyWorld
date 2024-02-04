const mogoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password : {
        type: String,
        required: true,
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
    deits : [{
        type: mogoose.Schema.ObjectId,
        ref : "Diet"
    }],

})

// export const WorkoutModel
const userModal = new mogoose.model("User", userSchema);
module.exports = { userModal };