const { client } = require('./index')



async function createSweetProduct({sweetsName, description, stock, price, departmentId}) {
    try {
        console.log()
        
        const { rows: [sweet_products] } = await client.query(`
        INSERT INTO sweet_products("sweetsName", description, stock, price, "departmentId")
        VALUES($1, $2, $3, $4, $5)
        ON CONFLICT ("sweetsName") DO NOTHING
        RETURNING *;
        `, [sweetsName, description, stock, price, departmentId]);
        return sweet_products
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createSweetProduct
}