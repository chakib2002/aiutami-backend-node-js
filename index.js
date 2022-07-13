const express = require("express");
const app = express();
const public_routes = require('./routes/public');
const authentication_routes = require('./authentication/routes');
const protected_routes = require('./routes/protected');

const cors = require('cors');
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));

app.use(cors({
  origin : "http://localhost:3000",
  methods : ["POST", "GET", "DELETE", "PATCH"],
  credentials : true
}))

app.get('/', (req, res, next)=>{
  res.send("Hello world")
})
app.use(authentication_routes);
app.use(public_routes);
app.use(protected_routes)

// set port, listen for requests
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

