require('dotenv').config();
const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt')
const { getAllUsers,
        getUserByUsername,
        createUser,
        } = require('../db/Users');

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  console.log("welcome");
  res.send({
    users,
  });
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);
    const saltValForPW = await bcrypt.genSalt(10);
    console.log("I'm the salt for password: ", saltValForPW)
    console.log("this is the JWT secret:", JWT_SECRET)
    const hashedPassword = await bcrypt.hash(password, saltValForPW);
    const areTheyTheSame = await bcrypt.compare(password, hashedPassword)
    if (Object.keys(user).length && user.password) {
      const newToken = jwt.sign(
        {
          username: username,
          id: user.id
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
        console.log("This is newToken: ", newToken)
      res.send({ message: "you're logged in!", token: newToken });
    } else {
      next({
        name: "LoginError",
        message: "Username or password is incorrect",
      });
    }
    
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const _user = await getUserByUsername(username);
    console.log("from user DB", _user)
    if (_user) {
      console.log("I exist", _user)
      res.status(409).send({
        name: "UserExistsError",
        message: "A user by that name already exists",
        status: 409
      });
    } else{

    
    
    // const user = await createUser({
    //   username,
    //   password,
    //   email
    // });
    const saltValForPW = await bcrypt.genSalt(10);
    console.log("I'm the salt for password: ", saltValForPW)
    const hashedPassword = await bcrypt.hash(password, saltValForPW);
    console.log("I'm the hashed for password: ", hashedPassword)
    const saltValForEmail = await bcrypt.genSalt(10);
    const hashedEmail = await bcrypt.hash(email, saltValForEmail)
    
    const newUserData = await createUser({
      username,
      password: hashedPassword,
      email: hashedEmail
  })
  console.log("I'm new user data: ", newUserData)
    const token = jwt.sign(
      {
        id: newUserData.id,
        username
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    
    delete newUserData.password
    console.log('This is newUserData: ', newUserData)
    res.status(200).send({
      message: "thank you for signing up",
      newUserData,
      token
    });
  }
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});


usersRouter.get('/me', async (req, res, next) => {
  try {
    console.log("this is req.user", req.user)
    if (!req.user) {
      next({
        name: "InvalidUserError",
        message: "You must be logged in to view your profile"
      })
    } else {
      const user = await getUserByUsername(req.user.username);
      console.log('what are we sending', user)
      res.send({
        user
      })
    }
  } catch (error) {
    console.error(error)
  }
});



usersRouter.get('/username/:cartId', async (req, res, next) => {
  const user = getUserByUsername();

  try {
    if (!req.user) {
      next({
        name: "InvalidUserError",
        message: "You must be logged in to view your profile"
      })
    } else {
      res.send({
        user
      })
    }
  } catch ({ name, message }) {
    next({ name, message })
  }
})

module.exports = {usersRouter};
