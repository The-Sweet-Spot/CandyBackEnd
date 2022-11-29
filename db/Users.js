const { client } = require("./index");
const bcrypt = require('bcrypt')

async function createUser({username, password, email}) {
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password, email)
            VALUES($1, $2, $3)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `, [username, password, email]);

        return user
    } catch (error) {
        console.log(error)
    }
}

async function getAllUsers(){
    try {
        const { rows } = await client.query(`
        SELECT id, username, password, email
        FROM users;
        `,);
        
        return rows;
    } catch (error) {
        console.log(error)
    }
}

async function getUserById(userId) {
    try {
        const { rows: [ user ] } = await client.query(`
        SELECT id, username
        FROM users
        WHERE id= $1;
        `,[userId]);

        if (!user) {
            return null
        }
        return user;
    } catch (error) {
        throw error
    }
}

async function getUserByUsername(username){
    try {
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1;
        `, [username])
        return user
    } catch (error) {
        console.log(error)
    }
}

// async function generateHashedValue(password) {
//     try {
//         const saltValue = await bcrypt.genSalt();
//         console.log("I am the salt value: ", saltValue);

//         const hashedValue = await bcrypt.hash(password, saltValue);
//         console.log("I am the hashed value: ", hashedValue)

//         const areTheyTheSame = await bcrypt.compare(password, hashedValue)
//         console.log("The flag for comparing: ", areTheyTheSame);
//     } catch (error) {
//         console.log(error)

//     }
// }

// generateHashedValue();


module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    getUserByUsername,
    
}