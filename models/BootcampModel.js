const mongoose = require('mongoose')

const BootcampSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Bootcamp name is required'],
        minLength: [2, 'Bootcamp name should be at least 2 characters '],
        maxLength: [255, 'Bootcamp name should be at most 255 characters'],
    },
    description: {
        type: String,
        maxLength: [255, 'Description should be comprised between 1 and 255 characters'],
        required: [true, 'Bootcamp description is required']
    },
    email: {
        type: String,
        //add the match prop
    },
    website: {
            type: String,
            //add the match property 
    },
    phone: {
        type: String,
        // add the match prop
    },
    careers: {
        type: [String],
        enum: ["Web Development", "UI/UX", "Mobile Development", "Data Science", "Business"]
    },
    housing: {
        type: Boolean,
        default: false
    },
    assistance: {
        type: Boolean,
        default: false
    },
    jobGurantee: {
        type: Boolean,
        default: false
    },
    photo: {
        type: String,
        default: 'photo.jpg'
    }
    
},{
    timestamps: true
})

module.exports = mongoose.model("Bootcamp", BootcampSchema)