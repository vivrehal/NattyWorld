import { userModal } from "../models/user.modal.js"
import { apiError } from "./apiError.js"

const generateTokens=async(userId)=>{
    try {
        console.log(userId)
        const user=await userModal.findById(userId);
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
        
    } catch (error) {
        throw new apiError(500,"Something went wrong while generating tokens")
    }
}

export default generateTokens