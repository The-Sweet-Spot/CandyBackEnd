const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JEW_SECRET

// JWT Middleware
 apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) { console.log("No auth")
    next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        console.log("We have Auth")
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            if (id) {
                console.log("we have id")
                req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
    }
});

// Routers
const bakeryRouter = require('./bakery');
const candyRouter = require('./candy');
const cartRouter = require('./cart');
const reviewsRouter = require('./reviews');
const usersRouter = require('./users');

apiRouter.use('/bakery', bakeryRouter);
apiRouter.use('/candy', candyRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/users', usersRouter);

// Error Router
apiRouter.use((error, req, res, next) => {
    res.send({
        error: "Error! ",
        name: error.name,
        message: "404 Error - Try again later! "
    });
});

// User Set (Is This Needed?)
apiRouter.use((req, res, next) => {
    if (req.user) {
        console.log("User is set:", req.user);
   }

   next();
});

// Export
module.exports = {
   apiRouter
};