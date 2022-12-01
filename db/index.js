require('dotenv').config();
const pg = require('pg');
//Below is required when working with Tori: DO NOT REMOVE!
const client = new pg.Client(process.env.DB_URL || (process.env.USER && process.env.PASSWORD ? {
    host: 'localhost',
    database: 'The-Sweet-Spot-dev',
    port: 5432,
    user: process.env.USER,
    password: process.env.PASSWORD,
}: 'postgres://localhost:5432/The-Sweet-Spot-dev'))

// if (process.env.USER && process.env.PASSWORD ) {
//     client = new pg.Client();
// } else if (process.env.DB_URL) {
//     client = new pg.Client(process.env.DB_URL)
// } else {
//     client = new pg.Client();
// }




module.exports = {
    client
}