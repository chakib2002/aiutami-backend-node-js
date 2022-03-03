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
        maxAge: 3600*24,
    },
    store : sessionStore

}))


app.use(Passport.initialize());
app.use(Passport.session());


app.get("/logout", controllers.logout);

app.post('/signup', controllers.add_user )  

app.post("/signin",Passport.authenticate('local-signin'),controllers.login);


module.exports = app ; 