import { asyncHandler } from "../utils/asyncHandler.js";
import { userModal } from "../models/user.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { apiError } from "../utils/apiError.js"
import generateTokens from "../utils/tokenGenerator.js";
import options from "../utils/cookieOptions.js";
import jwt from "jsonwebtoken"

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

const loginUser=asyncHandler(async(req,res)=>{
    //get credentials
    // validate credentials
    // find user
    // password compare
    // geerate access and refresh tokens
    // send tokens in cookie

    const {usernameOrEmail, password}=req.body
    if(!usernameOrEmail || !password){
        throw new apiError(400, "username or password is required")
    }

    const user=await userModal.findOne({usernameOrEmail})

    if(!user){
        throw new apiError(404, "User not found")
    }

    const isPasswordValid=await user.comparePassword(password)

    if(!isPasswordValid){
        throw new apiError(402, "Invalid user credentials")
    }

    const{refreshToken, accessToken}=await generateTokens(user._id)

    // console.log(refreshToken)

    const loggedInUser= await userModal.findById(user._id).select("-password -refreshToken")

    const cookieOptions=options
    // console.log(logg)
    return res
        .status(200)
        .cookie("accessToken",accessToken,cookieOptions)
        .cookie("refreshToken",refreshToken,cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    loggedInUser, accessToken, refreshToken
                },
                "User logged In successfully"
            )
        )
    

})

const logoutUser= asyncHandler(async(req,res)=>{
    await userModal.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken:"undefined"
            }
        },
        {
            new:true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User Logged out")
    )
})

const newTokenOnExpiry=asyncHandler(async(req,res)=>{
    const token=req.cookies?.refreshToken
    if(!token){
        throw new apiError(401,"no refresh token found in cookies")
    }
    const decodedToken=jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    if(!decodedToken){
        throw new apiError(401,"Invalid refresh token please login again")
    }
    const id=decodedToken._id
    const user=await userModal.findById(id)
    if(!user){
        throw new apiError(501,"Invalid refresh token no user matched")
    }
    if(user.refreshToken!==token){
        throw new apiError(501,"refresh token not matched with user's token")
    }

    const {refreshToken, accessToken}=generateTokens()

    res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                accessToken,refreshToken
            },
            "new Access Token generated successfully"
        )
    )


})

export {
    registerUser,
    loginUser,
    logoutUser
    }