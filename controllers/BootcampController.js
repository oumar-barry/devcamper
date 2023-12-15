const asyncHandler = require('express-async-handler')
const Bootcamp = require('../models/BootcampModel')
const ErrorResponse = require('../utils/ErrorResponse')
const {v4: uuid} = require("uuid") 
const path = require('path')

/**
 * @desc get all bootcamps 
 * @route GET /api/bootcamp/all
 * @access public
 */
exports.getBootcamps = asyncHandler(async(req, res, next) => {
    const bootcamps = await Bootcamp.find({})
    res.status(200).json({data: bootcamps})
})

/**
 * @desc get single bootcamp 
 * @route GET /api/bootcamp/:id
 * @access private
 */
exports.getBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp){
        return next(new ErrorResponse("Bootcamp doesn't not exist", 400))
    }
    res.status(200).json({data: bootcamp})
})

/**
 * @desc create a new bootcamp 
 * @route GET /api/bootcamp/new
 * @access private 
 */
exports.create = asyncHandler(async(req, res, next) => {
    const existingBootcamp = await Bootcamp.findOne({user: req.user.id})
    if(existingBootcamp && !req.user.roles.includes('admin')){
        return next(new ErrorResponse('Only one bootcamp per publisher', 403))
    }
    req.body.user = req.user.id
    const bootcamp = await Bootcamp.create(req.body)

    res.status(200).json({data: bootcamp})
})

/**
 * @desc upload bootcamp photo
 * @route GET /api/bootcamp/:id/upload
 * @access private
 */
exports.upload = asyncHandler(async(req, res, next) => {
    if(!req.files) return next(new ErrorResponse("You must select the image to upload",400))
    file = req.files.file
    
    // check if user is the owner of the bootcamp 
    let bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp){
        return next(
            new ErrorResponse("Bootcamp doesn't exists", 404)
        )
    }

    if(req.user.id != bootcamp.user.toString()){
        return next(
            new ErrorResponse("Select one of your bootcamp", 403)
        )
    } 

    //check for file type
    if(!file.mimetype.startsWith('image/')){
        return next(
            new ErrorResponse("Select an image file", 400)
        )
    }

    //check for size
    if(file.size > process.env.MAX_FILE_SIZE){
        return next(
            new ErrorResponse('Maximum size allowed is 5 Mo')
        )
    }

    file.name = `${uuid()}.${file.name.split('.').pop()}`
    
    file.mv(path.join(__dirname,'/../',process.env.UPLOAD_DIR,file.name), async (err) => {
        if(err){
            return next(
                new ErrorResponse('Something went wrong while uploading', 500)
            )
        } 
        
        bootcamp = await Bootcamp.findByIdAndUpdate(bootcamp._id,{photo: file.name}, {
            new: true,
            runValidators: false
        })

        res.status(200).json({data: bootcamp})

    })
})






