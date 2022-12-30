const express = require('express')
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')
const connectToDatabase = require('./db')

const PORT = process.env.PORT || 3000
const app = express()

//connect to MongoDB
connectToDatabase()

app.listen(PORT,()=>{
    console.log(`server is listening at http://localhost:${PORT}`)
})