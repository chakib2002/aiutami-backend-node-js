const express = require('express');
const controller = require('../controllers/public');
const {user_exist} = require('../authentication/controllers');

const route = express.Router() ;

// decisions of what route to fetch from is taken on the front end
route.get("/result/:care_type/:location/:transportation/:house_hold_tasks/:personal_care/:mobility_assistance/:companionship/:specialized_care",controller.fetch_seniorcare);//senior-care
route.get("/result/:care_type/:location/:level/:schoolyear/:subject",controller.fetch_tutoring);//tutors
route.get("/result/:care_type/:location/",controller.fetch_housekeeping); // housekeeper

route.get("/result/:user_id", controller.client_profile) // get info of a specific client
route.post("/result/:user_id", controller.client_request) // send a request to a specific caregiver or tutor .
route.get("/userExistance/:email", user_exist) //check if the user already exists in the db 

module.exports = route;