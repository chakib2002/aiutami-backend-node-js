
const controllers=require('../controllers/private');
const {processImage} = require('../image_processing/controller')
const express = require('express');
const {upload} = require('../image_processing/uploadMiddleware');
const app = express();


app.use(require('../authorization/authorization').is_authorized);


app.post("/checkNotifications", controllers.checkNotifications );
app.post("/updateNotifications", controllers.updateNotifications) ;
app.get("/requests", controllers.getAllNotifications);
app.delete("/requests/:id", controllers.deleteNotification);

app.post("/upload", upload.single('image'), processImage )



module.exports = app;