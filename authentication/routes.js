const session = require('express-session');
const {sessionStore}= require('./db_session');
const Passport = require('passport');
const passport = require('./passport_config');
const loginControllers = require('./login_controllers')
const express = require('express');
const app = express()


const route = express.Router();

app.use(session({
    key : "userId",
    secret: 'FCcBC&Bio2MM@_htD@88594kpmt_u-jk',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: null,
    }
}))

app.use(Passport.initialize());
app.use(Passport.session());

app.use((req,res,next) =>{
    console.log(req.session)
    console.log(req.user)
    next()
 })

// create the login & the register routes 
route.post('/register', loginControllers.add_user )



module.exports = route ; 