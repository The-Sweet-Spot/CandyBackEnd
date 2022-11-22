const { client } = require("./index");


async function createUser({username, password}) {
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password)
            VALUES($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `, [username, password]);

        return user
    } catch (error) {
        console.log(error)
    }
}

async function getAllUsers({ username, password}){
    try {
        const { rows } = await client.query(`
        SELECT id, username, password
        FROM users;
        `, [username, password]);
        
        return rows;
    } catch (error) {
        console.log(error)
    }
}

async function getUserById(userId) {
    try {
        const { rows: [ user ] } = await client.query(`
        SELECT id, username, password
        FROM users
        WHERE id=${ userId }
        `);

        if (!user) {
            return null
        }
        return user;
    } catch (error) {
        throw error
    }
}

async function getUserByUsername(userName){
    try {
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1;
        `, [userName])
        return user
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    getUserByUsername
}