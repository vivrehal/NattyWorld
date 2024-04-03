
const asyncHandler = (fn) => async(req, res, next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        if(!Number.isInteger(error.code)){
            console.log("error: " +error.code );
            res.status(500).json({
                success:false,
                message:error.code
            })
        }
        else res.status(error.code || 500)?.json({
            success:false,
            message:error.message
        })
    }
}

export {asyncHandler} 