import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser=asyncHandler(async(req,res)=>{
    // get data from frontend
    //validate
    //check if user already exists
    //create user
    //save in db
    const {
        username, 
        name, 
        email, 
        password, 
        dob, 
        weigt, 
        height} = req.body;
    
    console.log(username, name)
    
    

})

export {registerUser}