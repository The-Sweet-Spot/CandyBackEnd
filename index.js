require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
<<<<<<< HEAD
// const { apiRouter } = require('./api/index');
=======
const { apiRouter } = require('./api/index');
>>>>>>> 0ccf0f81e0ba6891f7ae0b589413733c700ae856
const { client } = require('./db/index');

const app = express();
//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));
<<<<<<< HEAD
console.log("Prints");
// app.use('/api', apiRouter);
console.log("Doesn't print");
=======
app.use('/api', apiRouter);

>>>>>>> 0ccf0f81e0ba6891f7ae0b589413733c700ae856
client.connect();
app.listen(3000, () => {
    console.log('We are now running on port 3000')
});

module.exports = {
    client,
    jwt,
    bcrypt
}