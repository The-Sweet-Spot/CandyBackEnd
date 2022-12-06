const { client } = require('./index')



async function createSweetProduct({sweetsName, description, stock, price, image, departmentId}) {
    try {
        console.log()
        
        const { rows: [sweet_products] } = await client.query(`
        INSERT INTO sweet_products("sweetsName", description, stock, price, image, "departmentId")
        VALUES($1, $2, $3, $4, $5, $6)
        ON CONFLICT ("sweetsName") DO NOTHING
        RETURNING *;
        `, [sweetsName, description, stock, price, image, departmentId]);
        return sweet_products
    } catch (error) {
        console.log(error)
    }
}
async function getAllSweetProducts() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM sweet_products;
        `);
        return rows
    } catch (error) {
        console.error(error)
    }
}
async function getSweetProductById(sweetsId) {
    try {
        const { rows: [sweet_products] } = await client.query (`
        SELECT *
        FROM sweet_products
        WHERE "sweetsId"=$1;
        `, [sweetsId]);
        return sweet_products;
    } catch (error){
        console.log(error)
    }
}

async function getSweetProductByName(sweetsName) {
    try{
        const { rows : [sweet_products] } = await client.query(`
        SELECT *
        FROM sweet_products
        WHERE "sweetsName"=$1;
        `, [sweetsName]);

        return sweet_products;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createSweetProduct,
    getAllSweetProducts,
    getSweetProductByName,
    getSweetProductById
}