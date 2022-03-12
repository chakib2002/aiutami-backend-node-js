
const controllers=require('../controllers/private')
const express = require('express');
const app = express();

app.use(require('../authorization/authorization').is_authorized);


app.get("/checknotification", controllers.checkNotifications ) // check if there are new notification available for the user

module.exports = app;