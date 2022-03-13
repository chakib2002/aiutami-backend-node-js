
const controllers=require('../controllers/private')
const express = require('express');
const app = express();

app.use(require('../authorization/authorization').is_authorized);


app.post("/checkNotifications", controllers.checkNotifications ) // check if there are new notification available for the user
app.post("/updateNotifications", controllers.updateNotifications)

module.exports = app;