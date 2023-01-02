const express = require('express')
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')
const bodyParser = require('body-parser')
const session = require('express-session')


const userModel = require('./models/users');



require('dotenv').config()

const db = require('./db')
const { get } = require('mongoose')
const { Cookie } = require('express-session')

const PORT = process.env.PORT || 3000
const app = express()


//connect to MongoDB
db.connectToDatabase()

//configure the app session
app.use(session({
    secret: process.env.SESSION_SECRECT,
    resave:false,
    saveUninitialized:true,
    Cookie: {maxAge: 60 * 60* 60 *1000}
}));

app.use(bodyParser.urlencoded({extended:false}))

app.use(passport.initialize()); // initialize passport middleware
app.use(passport.session()); // use passport session middleware

// use the userModel to create passport local strategy
passport.use(userModel.createStrategy()); 

//serializeUser determines which data of the user object should be stored in the session. 
passport.serializeUser(userModel.serializeUser())
//deserializeUser is used to retrieve user data from session and sends it as request
passport.deserializeUser(userModel.deserializeUser())
// set templating engine

app.set('view engine','ejs')


//initializing middleware to access static flies from public folder
app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/welcome', connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
    res.render('welcome')
});

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

//handele the signup
app.post('/signup',(req,res)=>{
    const user = req.body
    userModel.register(new userModel({username:user.username}),user.password,(err,user)=>{
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect("/welcome")
            });
        }
    })
})

//handle the login
app.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),(req,res)=>{
    
    res.redirect('/welcome')
})

// handles the logout request
app.post('/logout', (req, res) => {
    req.logout((err,data)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
});


app.listen(PORT,()=>{
    console.log(`server is listening at http://localhost:${PORT}`)
})