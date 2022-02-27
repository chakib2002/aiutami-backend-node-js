const express = require('express');
const controller = require('../controllers/public');
const route = express.Router() ;

// decisions of what route to fetch from is taken on the front end
route.get("/result/:care_type/:location/:transportation/:house_hold_tasks/:personal_care/:mobility_assistance/:companionship/:specialized_care",controller.fetch_seniorcare);//senior-care
route.get("/result/:care_type/:location/:level/:schoolyear/:subject",controller.fetch_tutoring);//tutors
route.get("/result/:care_type/:location/",controller.fetch_housekeeping); // housekeeper

module.exports = route;