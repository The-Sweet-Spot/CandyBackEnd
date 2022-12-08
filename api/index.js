require('dotenv').config();
const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
const {getUserById} = require('../db/Users')

// JWT Middleware
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    console.log("this is req.header on indexAPI", req.header('Authorization'))

    if (!auth) { console.log("No auth")
            next();
    } else if (auth) {
        const token = auth.slice(prefix.length);
        console.log("We have Auth", token)
        console.log("this is the secret", JWT_SECRET)
        try {
            const verifiedData = await jwt.verify(token, JWT_SECRET);
            console.log("this is verifiedData", verifiedData)
                if (verifiedData.id) {
                    
                    req.user = {
                        usersId: verifiedData.id,
                        username: verifiedData.username
                    }
                    console.log("this is req.user", req.user)
                    next();
                }
        } catch (error) {
            console.error(error);
        }
            } else {
            next({
                name: 'AuthorizationHeaderError',
                message: `Authorization token must start with ${ prefix }`
            });
        }
    });

// Routers
const {departmentRouter} = require('./Department');
const {sweetsRouter} = require('./SweetProducts');
const {cartRouter} = require('./Cart');
const {usersRouter} = require('./Users');
const {cartItemsRouter} = require('./CartItems')
apiRouter.use('/department', departmentRouter);
apiRouter.use('/sweets', sweetsRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/cartitems', cartItemsRouter)

// Error Router
// apiRouter.use((error, req, res, next) => {
// res.send({
// error: "Error! ",
// name: error.name,
// message: "404 Error - Try again later! "
// });
// });

// User Set (Is This Needed?)
apiRouter.use((req, res, next) => {
if (req.users) {
console.log("User is set:", req.users);
}

next();
});

// Export
module.exports = {
apiRouter
};
