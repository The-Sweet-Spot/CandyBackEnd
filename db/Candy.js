const { client } = require('./index')

async function createCandy({name, price, description, candyId}) {
    try {
        const { rows: [candy] } = await client.query(`
        INSERT INTO candy(name, price, description, "candyId")
        VALUES($1, $2, $3, $4)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `, [name, price, description, candyId])
    } catch (error) {
        console.error(error.detail)
    }
}
async function getAllCandy() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM candy
        RETURNING *;
        `);
        return rows
    } catch (error) {
        console.error(error.detail)
    }
}
async function getCandyById(candyId) {
    try {
        const { rows: [candy] } = await client.query(`
        SELECT * FROM candy
        WHERE id=${candyId};
        `);
        return candy ? candy : console.error("No candy found")
    } catch (error) {
        console.error(error.detail)
    }
}
async function getCandyByName(name) {
    try {
        const { rows: [candy] } = await client.query(`
        SELECT *
        FROM candy
        WHERE name=$1;
        `, [name]);
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