const express = require('express')
const app = express()
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const expressFileUpload = require('express-fileupload')
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser')
const { errorHandler } = require('./middleware/error')
dotenv.config({path: './config/config.env'})

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(expressFileUpload())


//biding routes
app.use('/api/auth',require('./routes/authRoute'))
app.use('/api/bootcamp', require('./routes/bootcampRoute'))
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`.bold))