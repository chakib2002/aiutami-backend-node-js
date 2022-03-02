const session = require('express-session');
const {sessionStore}= require('./db_session');
const Passport = require('passport');
const express = require('express');
const app = express()
const controllers = require('./controllers')


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

route.post('/signup', controllers.add_user )


module.exports = route ; 