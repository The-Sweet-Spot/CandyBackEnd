require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { apiRouter } = require('./api/index');
const { client } = require('./db/index');


const app = express();
//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));

app.use('/api', apiRouter);

client.connect();
app.listen(3000, () => {
    console.log(`We are now running on port 3000`)
});

module.exports = {
    client,
    jwt,
    bcrypt
}