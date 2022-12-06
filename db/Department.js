const { client } = require('./index')

async function createDepartment({departmentId, departmentName}) {
    try {
        await client.query(`
        INSERT INTO department("departmentId", "departmentName")
        VALUES ($1, $2)
        ON CONFLICT ("departmentName") DO NOTHING
        RETURNING *;
        `, [departmentId, departmentName])
    } catch (error) {
        console.error(error)
    }
}
async function getAllDepartments() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM department;
        `);
        return rows
    } catch (error) {
        console.error(error)
    }
}
async function getDepartmentById(departmentId) {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM department
        WHERE "departmentId"=$1;
        `, [departmentId])
        return rows
    } catch (error) {
        console.error(error)
    }
}
module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById
}

//createDepartment

//go back to seed import this fuction and create the two departments
//update create sweet products to include individual department(1 or 2)