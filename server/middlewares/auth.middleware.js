import { newTokenOnExpiry } from "../controllers/user.controllers.js";
import { userModal } from "../models/user.modal.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const verifyJWT=asyncHandler(async(req,res,next)=>{
try {
        let token=req.cookies?.accessToken || 
        req.header("Authorization")?.replace("Bearer ","") 
        // console.log(token)
        if(token==="undefined"){
            // throw new apiError(401, "Unauthorized acess")
                return res.status(499).json(new ApiResponse(401, {}, "Unauthorized acess"));
                
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
    // throw new apiError(404, error?.mesage || "Invalid access token")
    return res.status(499).json(new ApiResponse(404, {}, error?.mesage || "Invalid access token"));
}
})

export default verifyJWT