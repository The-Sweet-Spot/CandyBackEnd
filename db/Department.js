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

module.exports = {
    createDepartment
}

//createDepartment

//go back to seed import this fuction and create the two departments
//update create sweet products to include individual department(1 or 2)