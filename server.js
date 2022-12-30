const express = require('express')
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')
const connectToDatabase = require('./db')

const db = require('./db')

const PORT = process.env.PORT || 3000
const app = express()

// set templating engine
app.set('views','public')
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('index')
})

//connect to MongoDB
db.connectToDatabase()

app.listen(PORT,()=>{
    console.log(`server is listening at http://localhost:${PORT}`)
})