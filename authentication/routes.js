const session = require('express-session');
const {sessionStore}= require('./db_session');
const db = require('../models/model')
const Passport = require('passport');
const express = require('express');
const app = express()
const controllers = require('./controllers');

require('./passport')(Passport,db.User)







app.use(session({
    key : "userId",
    secret: 'FCcBC&Bio2MM@_htD@88594kpmt_u-jk',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: null,
    },
    store : sessionStore

}))


app.use(Passport.initialize());
app.use(Passport.session());

// app.use((req,res,next) =>{
//     console.log(req.user)
//     console.log(req.isAuthenticated())
//     next()
//  })

app.get("/logout", controllers.logout);

app.post('/signup', controllers.add_user )  

app.post("/signin",Passport.authenticate('local-signin'),controllers.login);

app.get("/isAuth", controllers.login)

module.exports = app ; 