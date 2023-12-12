const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser')
const { errorHandler } = require('./middleware/error')
const app = express()
dotenv.config({path: './config/config.env'})

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

//biding routes
app.use('/api/auth',require('./routes/authRoute'))
app.use(errorHandler)

connectDB()
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`.bold))
