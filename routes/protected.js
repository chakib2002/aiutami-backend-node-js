
const controllers=require('../controllers/private');
const express = require('express');

const app = express();


app.use(require('../authorization/authorization').is_authorized);

//look up for new notifications .
app.post("/checkForNewNotifications", controllers.checkForNewNotifications );
//delete viewed notification from redis store and update the "new" column in the db .
app.delete("/DeleteNotificationsFromRedisStore", controllers.DeleteNotificationsFromRedisStore) ; 
// get all recieved notifications .
app.get("/fetchNotifications", controllers.fetchNotifications);
// get all accepted jobs
app.get("/fetchAcceptedJobRequestNotifications", controllers.fetchAcceptedJobRequestNotifications);
// delete a specific notification
app.delete("/deleteNotification/:id", controllers.deleteNotification);
// update accepted
app.patch("/updateAccepted/:id", controllers.updateAccepted)
// update seen
app.patch("/updateSeen/:id", controllers.updateSeen)



module.exports = app;