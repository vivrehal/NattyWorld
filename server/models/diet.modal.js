const mogoose = require("mongoose");

const dietSchema = new mongoose.Schema({
    plan: {
        type : String, // Link of the pdf of the diet
        unique : true
    }
})