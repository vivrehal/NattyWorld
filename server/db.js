import mongoose from "mongoose";
const connectTodb=async(url)=>{
    mongoose.set("strictQuery",true);
    try {
        await mongoose.connect(url)
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default connectTodb;