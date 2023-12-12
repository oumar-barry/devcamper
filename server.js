const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const app = express()
dotenv.config({path: './config/config.env'})


const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`.bold))
