
const connectDB = require('./config/database')
const Bootcamp = require('./models/BootcampModel')
const User = require('./models/UserModel')
const fs = require('fs')
require('colors')
const bootcamps = JSON.parse(fs.readFileSync(`./_data/bootcamps.json`, 'utf-8'))
connectDB()

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        console.log(`Data imported successfully`.cyan.bold)
        process.exit()
    } catch (err) {
        console.error(`${err}`.red.bold)
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        //await User.deleteMany()
        console.log(`Data deleted successfully`.cyan.bold)
        process.exit()
    } catch (err) {
        console.error(`${err}`.red.bold)
    }
}

if(process.argv[2] == '-i'){
    importData()
} else if(process.argv[2] == '-d'){
    deleteData()
}

