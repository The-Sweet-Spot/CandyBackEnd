const { client } = require('./index')

async function createCandy({candyName, price, candyDescription, stock}) {
    try {
        const { rows: [candy] } = await client.query(`
        INSERT INTO candy("candyName", price, "candyDescription", stock)
        VALUES($1, $2, $3, $4)
        ON CONFLICT ("candyName") DO NOTHING
        RETURNING *;
        `, [candyName, price, candyDescription, stock]);
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