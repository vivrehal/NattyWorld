const mogoose = require("mongoose");


const workoutSchema = new mogoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    },
    plan: {
        type : String, // Link of the pdf of the diet
        unique : true
    }
})