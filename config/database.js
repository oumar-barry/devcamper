const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://oumar:oumarbarry@cluster0.8wlalmm.mongodb.net/?retryWrites=true&w=majority")
        console.log(`Database connected successfully on ${conn.connection.host}`.bold)
    } catch (err) {
        console.error(`${err}`.bold.red)
    }
} 

module.exports = connectDB