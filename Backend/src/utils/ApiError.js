// class ApiError extends Error{
//     constructor(
//         statusCode,
//         message = "Something went wrong.",
//         errors = [],
//         // stack = ""
//     ){
//         super(message)
//         this.statusCode = statusCode
//         this.data = null
//         this.message = message
//         this.success = false
//         this.errors = errors

//         // if(stack){
//         //     this.stack = stack
//         // }
//         // else{
//         //     Error.captureStackTrace(this, this.constructor)
//         // }
//     }

//     toJson(){
//         return {
//             statusCode : this.statusCode,        
//             message : this.message ,
//             success : this.success ,
//             errors : this.errors 

//         }
            

//     }
// }


class ApiError extends Error{
    constructor(
        statusCode,
        errors = [],
        success = false
    ){

        super()
        this.statusCode = statusCode || 500
        this.errors = errors
        this.success = success

    }
}

export default ApiError;