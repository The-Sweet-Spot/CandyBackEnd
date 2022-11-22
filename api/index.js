const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JEW_SECRET