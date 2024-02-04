const mogoose = require("mongoose");

const dietSchema = new mongoose.Schema(
{
    plan: {
        type : String, // Link of the pdf of the diet
        unique : true
    }
},{
    timestamps:true
})

const dietModal = new mogoose.model("Diet", dietSchema);
module.exports = { dietModal };