const express = require ('express');
const departmentRouter = express.Router();
const {
    createDepartment,
    getAllDepartments,
    getDepartmentById
} = require('../db/Department')

departmentRouter.get("/", async (req, res, next) => {
    try {
        const departments = await getAllDepartments();
        res.send(departments)
    } catch (error) {
        console.error(error)
    }
})
departmentRouter.get("/:departmentId", async (req, res, next) => {
    try {
        const { departmentId } = req.params
        const response = await getDepartmentById(departmentId)
        res.send(response)
    } catch (error) {
        console.error(error)
    }
})
module.exports = {departmentRouter}