const express = require("express");
const public_routes = require('./routes/public');
const authentication_routes = require('./authentication/routes');


const app = express();


app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to aiutami application." });
});



app.use(authentication_routes);
app.use(public_routes);


// set port, listen for requests


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});