const mogoose = require("mongoose");


const workoutSchema = new mogoose.Schema({
    plan: {
        type : String, // Link of the pdf of the diet
        unique : true
    }
})