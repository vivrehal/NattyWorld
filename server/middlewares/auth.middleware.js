import { userModal } from "../models/user.modal.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const verifyJWT=asyncHandler(async(req,res,next)=>{
try {
        const token=req.cookies?.accessToken || 
        req.header("Authorization")?.replace("Bearer ","")
        console.log(token)
        if(!token){
            throw new apiError(401, "Unauthorized acess")
        }
        
        const decodedToken=jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
            )
            
            // console.log(token,"kj/h")
        const user= await userModal.findById(decodedToken?._id)
        .select("-password -refreshToken")
    
        req.user=user
            // console.log("authorization complete")
        next();
} catch (error) {
    throw new apiError(404, error?.mesage || "Invalid access token")
}
})

export default verifyJWT