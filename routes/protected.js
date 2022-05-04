
const controllers=require('../controllers/private');
const express = require('express');

const app = express();


app.use(require('../authorization/authorization').is_authorized);


app.post("/checkNotifications", controllers.checkNotifications );
app.post("/updateNotifications", controllers.updateNotifications) ;
app.get("/requests", controllers.getAllNotifications);
app.delete("/requests/:id", controllers.deleteNotification);



module.exports = app;