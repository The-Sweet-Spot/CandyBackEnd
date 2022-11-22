// Step 1: Import Client & Exports
const { create } = require('domain');
const { client } = require('./index')
const { createUser, getAllUsers } = require('./Users')
// Imports
// const {} = require('./Bakery');

// Step 2: User Methods
    // Method: dropTables
    async function dropTables(){
        try {
            console.log("Dropping tables: ");
            await client.query(`
              DROP TABLE IF EXISTS cart_items;
              DROP TABLE IF EXISTS cart;
              DROP TABLE IF EXISTS baked_goods;
              DROP TABLE IF EXISTS candy;
              DROP TABLE IF EXISTS users;
            `)
          
            console.log("Finished dropping tables")
        } catch(error){
            console.log("Error dropping tables")
            console.log(error.detail)
        }
    }

    // Method: createTables
async function createTables() {
    try {
        console.log('Starting to build tables...');
        await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            "is_active" BOOLEAN DEFAULT true
        );
        CREATE TABLE candy(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            stock INTEGER,
            price NUMERIC,
            description VARCHAR(255) NOT NULL,
            image VARCHAR(255) UNIQUE NOT NULL,
            "candyId" INTEGER REFERENCES candy(id)
        );
        CREATE TABLE baked_goods(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            stock INTEGER,
            price NUMERIC,
            description VARCHAR(255) NOT NULL,
            image VARCHAR(255) UNIQUE NOT NULL,
            "bakedId" INTEGER REFERENCES baked_goods(id)
        );
        CREATE TABLE cart(
            id SERIAL PRIMARY KEY,
            "usersId" SERIAL,
            "cartId" SERIAL    
        );
        CREATE TABLE cart_items(
            id SERIAL PRIMARY KEY,
            "cart_id" INTEGER REFERENCES cart(id),
            "cart_item_id" INTEGER REFERENCES cart_items(id),
            "price_bought_at" NUMERIC,
            UNIQUE ("cart_id", "cart_item_id")
        );`);   

          console.log('Finished building tables!');
        } catch (error) {
          console.error('Error building tables!');
          console.log(error);
        }
    }

    // Method: createInitialUsers
async function createInitialUsers() {
    console.log("Starting to create users:")
    try {
        await createUser({
            username: 'dalron',
            password: 'dalron',
            email: 'dalron@gmail.com',
            is_active: true,
        });
        await createUser({
            username: 'john',
            password: 'john',
            email: 'john@gmail.com',
        });
        await createUser({
            username: 'marc',
            password: 'marc',
            email: 'marc@gmail.com',
        });
        await createUser({
            username: 'tori',
            password: 'tori',
            email: 'tori@gmail.com',
        });
        console.log("Finished creating users:");
    } catch (error) {
        console.error("Error when creating users:");
        console.log(error);
    }
};

Method: testDB
async function testDB() {
    try {
        console.log("calling getAllUsers")
        const user = await getAllUsers();
        
        console.log("results ", user)
    } catch (error) {
        console.log("Error during testDB");
        console.log(error.detail);
    }
  }

Method: rebuildDB
async function rebuildDB() {
    try {
      client.connect();
      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
      console.log("Error during rebuildDB:")
      console.log(error.detail);
    }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());