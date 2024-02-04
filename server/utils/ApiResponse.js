class ApiResponse{
    constructor(statusCode, data, message="ok"){
        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.success=statusCode<400 // ok status range (100-399)
    }
}

export {ApiResponse}