import { asyncHandler } from "../utils/asyncHandler.js";
import { userModal } from "../models/user.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { apiError } from "../utils/apiError.js"

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
        weight, 
        height} = req.body;
    
    console.log(username, name)

    if([username,name,email,password]
        .some((field)=>field.trim()==="")){
            throw new apiError(400, "All fields required")
        }
        // console.log(typeof weight)
    if([weight, height]
        .some((field)=>typeof field!=='number')){
            throw new apiError(400, "Expected Number in Height and Weight Field")
        }

    if(!email.includes('@')){
        throw new apiError(400, "email is not valid")
    }

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
        // console.log(passwordRegex.test("123vivek@"))
        throw new apiError(400, "Password should contain minimum eight characters, at least one letter, one number and one special character")
    }


    const userExists=await userModal.findOne({
        $or: [{username}, {email}]
    })

    if(userExists){
        throw new apiError(409, "User already exists")
    }

    const user=await userModal.create({
        name,
        email,
        username:username.toLowerCase(),
        password,
        dob,
        weight,
        height
    })

    const isUserCreated=await userModal.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!isUserCreated){
        throw new apiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json(
        new ApiResponse(200, isUserCreated, "User registered successfully")
    )
})

export {registerUser}