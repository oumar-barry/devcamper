const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'firstname is required'],
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'User email should be unique ']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        Select: false
    },
    confirmEmailToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    roles: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

// hash the password before saving to database 
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


//Generate a token to send for the client 
UserSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

//Compare entered password to the encryped on in database 
UserSchema.methods.passwordMatches = async function(password){
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("user", UserSchema)