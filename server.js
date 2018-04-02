require('./config/config');

const _ = require('lodash');
// Makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc

const express = require('express');
// It is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

const bodyParser = require('body-parser');
// Node.js body parsing middleware.

var cors = require('cors')

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));

//if no route defiend
app.get('/', (req, res) => res.status(200).send("TODO API!"));

require('./routes/route.user')(app);
require('./routes/route.todo')(app);

app.listen(port, () => {
    console.log(`Todo API started up at port ${port}`);
});

module.exports = { app };
