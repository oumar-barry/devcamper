const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

exports.protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) return next(new ErrorResponse('Not authorized to access this route 1 ', 401))
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    } catch (error) {
        return next(new ErrorResponse('Invalid token, access denied', 401))
    }
}