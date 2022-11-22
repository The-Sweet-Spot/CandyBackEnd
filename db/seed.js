// Step 1: Import Client & Exports
const { create } = require('domain');
const { client } = require('./index')

// Imports
// const {} = require('./Bakery');

// Step 2: User Methods
    // Method: dropTables
async function dropTables(){
    try {
        await client.query(`
          DROP TABLE IF EXISTS candy;
          DROP TABLE IF EXISTS cart;
          DROP TABLE IF EXISTS cart_items;
          DROP TABLE IF EXISTS baked_goods;
          DROP TABLE IF EXISTS users;
          DROP TABLE IF EXISTS reviews;
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
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR (255) UNIQUE NOT NULL,
            password VARCHAR (255) NOT NULL,
            email VARCHAR (255) UNIQUE NOT NULL,
            is_active BOOLEAN DEFAULT true
    );`);
    // console.log("TABLE WORKS FROM HERE!!!!!!")
        await client.query(`
        CREATE TABLE candy (
            id SERIAL PRIMARY KEY,
            name VARCHAR (255) NOT NULL,
            stock INTEGER,
            price NUMERIC,
            description VARCHAR (255) NOT NULL,
            image VARCHAR (255) UNIQUE NOT NULL,
            "candyId" INTEGER REFERENCES candy(id)
    );`);
    console.log("TABLE WORKS FROM HERE  CANDY PRINTS")
        await client.query(`
        CREATE TABLE baked_goods (
            id SERIAL PRIMARY KEY,
            name VARCHAR (255) NOT NULL,
            stock INTEGER,
            price NUMERIC,
            description VARCHAR (255) NOT NULL,
            image VARCHAR (255) UNIQUE NOT NULL,
            "bakedId" INTEGER REFERENCES baked(id)
    );`);
    console.log("BAKED GOODS Has An Error")
        await client.query(`  
        CREATE TABLE cart_item (
            cart_id INTEGER REFERENCES carts(id),
            product_id INTEGER REFERENCES product(id),
            cart_item_id INTEGER REFERENCES cart_item(id),
            price_bought_at NUMBERIC
    );`);
    console.log("CART ITEM HAS AN ERROR")
        await client.query(` 
        CREATE TABLE reviews(
            "candy_id" INTEGER REFERENCES candy(id),
            "baked_id" INTEGER REFERENCES baked(id),
            "userId" NUMERIC,
            title VARCHAR (255) UNIQUE NOT NULL,
            description VARCHAR (255) NOT NULL
    );`);
    console.log("TABLE WORKS FROM HERE REVIEWs PRINTS")
        await client.query(`  
        CREATE TABLE cart (
            "userId" SERIAL,
            "cartId" SERIAL    
    );`);   
          console.log('Finished building tables!');
        } catch (error) {
          console.error('Error building tables!');
          console.log(error.detail);
        }
    }

    // Method: createInitialUsers
async function createInitialUsers() {
    console.log("Starting to create users:")
    try {
        await createUser({
            username: 'dalron',
            password: 'dalron',
            first_name: 'Dalron',
            last_name: 'Dalron',
            email: 'dalron@gmail.com',
            is_active: true,
        });
        await createUser({
            username: 'john',
            password: 'john',
            first_name: 'John',
            last_name: 'John',
            email: 'john@gmail.com',
            is_active: true,
        });
        await createUser({
            username: 'marc',
            password: 'marc',
            first_name: 'Marc',
            last_name: 'Marc',
            email: 'marc@gmail.com',
            is_active: true,
        });
        await createUser({
            username: 'tori',
            password: 'tori',
            first_name: 'Tori',
            last_name: 'Tori',
            email: 'tori@gmail.com',
            is_active: true,
        });
        console.log("Finished creating users:");
    } catch (error) {
        console.error("Error when creating users:");
        console.log(error.detail);
    }
};

// Method: testDB
async function testDB() {
    try {
        const result = await client.query(`SELECT * FROM users;`);
 
        console.log(result);
    } catch (error) {
        console.log("Error during testDB");
        console.log(error.detail);
    }
  }

// Method: rebuildDB
async function rebuildDB() {
    try {
      client.connect();
      await dropTables();
      await createTables();
      await testDB();
    } catch (error) {
      console.log("Error during rebuildDB:")
      console.log(error.detail);
    }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());