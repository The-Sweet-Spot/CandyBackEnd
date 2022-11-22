require('dotenv').config();
const pg = require('pg');
//Below is required when working with Tori: DO NOT REMOVE!
let client

if (process.env.user && process.env.password ) {
    client = new pg.Client({
        host: 'localhost',
        database: 'The-Sweet-Spot-dev',
        port: 5432,
        user: process.env.user,
        password: process.env.password,
    });
} else {
    client = new pg.Client('postgres://localhost:5432/The-Sweet-Spot-dev');
}

module.exports = {
    client 
}