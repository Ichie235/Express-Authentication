const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

function connectToDatabase(){
    mongoose.connect(MONGODB_URI,{
        dbName: "user-Auth",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
      },(err) =>
      err ? console.log(err) : console.log(
        "Connected to user-Auth database"))

    mongoose.connection.on('connected',()=>{
        console.log('connection to MongoDB was successful')
    });

    mongoose.connection.on('error',()=>{
        console.log('connecting to MongoDB was unsuccessful')
    })
}

module.exports = {connectToDatabase}