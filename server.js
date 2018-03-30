require('./config/config');

const _ = require('lodash');
// Makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc

const express = require('express');
// It is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

const bodyParser = require('body-parser');
// Node.js body parsing middleware.


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Todo API started up at port ${port}`);
});

module.exports = { app };
