const ErrorResponse = require("../utils/ErrorResponse")
exports.errorHandler = (err, req, res, next) => {
    let error = {...err}
    let message = null 
    error.message = err.message
    console.log(err)

    // check if the object id is valid and exists 
    if(err.name == 'CastError'){
        message = 'Resource not found '
        error = new ErrorResponse(message,404)
    }

    //check for duplicate field values
    if(err.code == 11000){
        message = 'Duplicate field value entered on email '
        error = new ErrorResponse(message,401)
    }

    // Check for validation error 
    if(err.name == 'ValidationError'){
        message = Object.values(err.errors).map(val => val.message)
        erorr = new ErrorResponse(message,401)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Interval server error '
    })
}