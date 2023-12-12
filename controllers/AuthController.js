const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')

exports.register = asyncHandler(async (req, res, next) => {
   const user = await User.create(req.body)
   // send confirmation email
   sendTokenResponse(res,user,200)
})


exports.login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user || !(await user.passwordMatches(password))){
        // This will be replace by a middleware later 
        res.status(400).json({success: false, msg: 'Invalid credentials '})
    }

    sendTokenResponse(res,user,200)
})

async function sendTokenResponse(res,user,statusCode){
    const options = {
        expire: new Date(
            Date.now + 24*60*60*1000
        ),
        httpOnly: true
    }

    if(process.env.NODE_ENV == 'development'){
        options.secure = true
    }
    const token = user.generateToken()
    res.status(statusCode).cookie('token',token, options).json({
        user,
        token
    })
}
