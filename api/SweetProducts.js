const express = require ('express');
const sweetsRouter = express.Router();
const {
    createSweetProduct,
    getAllSweetProducts,
    getSweetProductByName,
    getSweetProductById
} = require('../db/SweetProducts')
const {
    getDepartmentById
} = require('../db/Department')

sweetsRouter.get("/", async (req, res, next) => {
    try {
        const response = await getAllSweetProducts();
        res.send(
            response
        )
    } catch (error) {
        console.log(error)
    }
})

sweetsRouter.get("/:sweetsId", async (req, res, next) => {
    try {
        const { sweetsId } = req.params
        const response = await getSweetProductById(sweetsId);
        res.send(
            response
        )
    } catch (error) {
        console.log(error)
    }
})
sweetsRouter.get("/:departmentId", async (req, res, next) => {
    try {
        const { departmentId } = req.params
        const response = await getDepartmentById(departmentId)
        res.send(response)
    } catch (error) {
        console.error(error)
    }
})

module.exports = {sweetsRouter}