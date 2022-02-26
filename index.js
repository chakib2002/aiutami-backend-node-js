const express = require("express");
const sequelize = require('./models/main')
const {User, Subjects, Tutors, Seniorcare, Housekeeper, Provinces, Jobs}= require('./models/model');

const app = express();


app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to aiutami application." });
});
sequelize.authenticate().then(()=>console.log('db connected')).catch((err)=>console.log('db not connected !!!!'))
Provinces.sync().then(()=>console.log("table created successfully")).catch((err)=>console.log('err'))
User.sync().then(()=>console.log("table created successfully")).catch((err)=>console.log('err'))
Jobs.sync().then(()=>console.log("table created successfully")).catch((err)=>console.log('err'))
Housekeeper.sync().then(()=>console.log("table created successfully")).catch((err)=>console.log('err'))
Seniorcare.sync().then(()=>console.log("table created successfully")).catch((err)=>console.log('err'))
Tutors.sync().then(()=>console.log("table created successfully")).catch((err)=>console.log('err'))
Subjects.sync().then(()=>console.log("table created successfully")).catch((err)=>console.log('err'))
// set port, listen for requests
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});