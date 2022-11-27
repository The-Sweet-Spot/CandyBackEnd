const express = require ('express');
const candyRouter = express.Router();

const {requireUser} = require('./utilities')

const {
    createCandy,
    getAllCandy,
    getCandyById,
    getCandyByName,
} = require ('../db/Candy');
candyRouter.get("/", async (req, res, next) => {
    try {
        const response = await getAllCandy();
        res.send(
            response
        )
    } catch (error) {
        console.log(error)
    }
})
candyRouter.get("/:candyid", async (req, res, next) => {
    try {
        const response = await getCandyById(candyId);
        res.send(
            response
        )
    } catch (error) {
        console.log(error)
    }
})
candyRouter.get("/:candyname", async (req, res, next) => {
    try {
        const response = await getCandyByName(candyName);
        res.send(
            response
        )
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
    candyRouter
}
