import { userModal } from "../models/user.modal.js"
import { apiError } from "./apiError.js"

const generateTokens=async(userId, flag=true)=>{
    try {
        // console.log(userId+"jhgfd")
        const user=await userModal.findById(userId);
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        if(flag===true){
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave: false})
        }
        // console.log(accessToken)
        return {accessToken, refreshToken}
        
    } catch (error) {
        console.log(error)
        return error
    }
}

export default generateTokens