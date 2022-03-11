const express = require('express');
const app = express();

app.use(require('../authorization/authorization').is_authorized)




module.exports = app;