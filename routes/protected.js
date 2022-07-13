
const controllers=require('../controllers/private');
const express = require('express');
const {upload} = require('../image_processing/uploadMiddleware');
const {processImage} = require('../image_processing/controller');

const app = express();


app.use(require('../authorization/authorization').is_authorized);

//look up for new notifications .
app.post("/checkForNewNotifications", controllers.checkForNewNotifications );
//delete viewed notification from redis store and update the "new" column in the db .
app.post("/DeleteNotificationsFromRedisStore", controllers.DeleteNotificationsFromRedisStore) ; 
// get all recieved notifications .
app.get("/fetchNotifications", controllers.fetchNotifications);
// get all accepted jobs
app.get("/fetchAcceptedJobRequestNotifications", controllers.fetchAcceptedJobRequestNotifications);
// delete a specific notification
app.delete("/deleteNotification/:id", controllers.deleteNotification);
// update accepted
app.patch("/updateAccepted/:id", controllers.updateAccepted);
// update seen
app.patch("/updateSeen/:id", controllers.updateSeen);
// upload profile picture 
app.post("/upload", upload.single('image'), processImage ) ;



module.exports = app;