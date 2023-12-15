const express = require('express')
const router = express.Router()
const {
    getBootcamps,
    getBootcamp,
    create,
    upload
        } = require('../controllers/BootcampController')
const { protect } = require('../middleware/auth')


router.get('/all',protect,getBootcamps)
router.get('/:id',protect,getBootcamp)
router.post('/new',protect,create)
router.post('/:id/upload',protect,upload)

module.exports = router