const { client } = require('./index')

async function createCandy({candyName, candyDescription, stock, price, image}) {
    try {
        console.log("starting to creat ecandy", candyName)
        
        const { rows: [candy] } = await client.query(`
        INSERT INTO candy("candyName", "candyDescription", stock, price, image)
        VALUES($1, $2, $3, $4, $5)
        ON CONFLICT ("candyName") DO NOTHING
        RETURNING *;
        `, [candyName, candyDescription, stock, price, image]);
        return candy;
    } catch (error) {
        console.error(error)
    }
}
async function getAllCandy() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM candy;
        `);
        return rows
    } catch (error) {
        console.error(error)
    }
}
async function getCandyById(candyId) {
    try {
        const { rows: [candy] } = await client.query(`
        SELECT * FROM candy
        WHERE "candyId"=${candyId};
        `);
        return candy ? candy : console.error("No candy found")
    } catch (error) {
        console.error(error.detail)
    }
}
async function getCandyByName(candyName) {
    try {
        const { rows: [candy] } = await client.query(`
        SELECT *
        FROM candy
        WHERE "candyName"=$1;
        `, [candyName]);
        return candy;
    } catch (error) {
        console.error(error.detail)
    }
}

module.exports = {
    createCandy,
    getAllCandy,
    getCandyById,
    getCandyByName
}