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
// async function decryptJWT(req, res, next) {
//     try {
//         console.log(req.headers);
//         const authorizationHeader = req.headers.authorization 
//         if (!authorizationHeader) {
//             res.error('Invalid input')
//         } else {
//             const slicedToken = req.headers.authorization.slice(7)
//             const verifyAuth = jwt.verify(slicedToken, JWT_SECRET)
//             console.log(verifyAuth)
//             const sampleObj = {}
//             req.user = verifyAuth
//         }
//         next();
//     } catch (error) {
//         console.log(error)
//     }
// }
//step 1: get a request that contains a Auth header with json web token
//step 2: write a middleware funtion that can idetify a jwt on the auth header
//step 3: if there is a JWT on header, grab that data( jwt.verify)
//step 4: every route handler will have access to that data, attach the data to the request object
//step 5: use next() to pass it
// app.use(decryptJWT)
app.use('/api', apiRouter);
const PORT = process.env.PORT || 3000
client.connect();
app.listen(PORT, () => {
    console.log(`We are now running on port ${PORT}`)
});

module.exports = {
    client,
    jwt,
    bcrypt
}