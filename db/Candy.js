const { client } = require('./index')

async function createCandy({name, price, description, stock}) {
    try {
        const { rows: [candy] } = await client.query(`
        INSERT INTO candy(name, price, description, stock)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `, [name, price, description, stock]);
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