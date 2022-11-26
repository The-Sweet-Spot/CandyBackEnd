// Step 1: Import Client & Exports
const { create } = require('domain');
const { client } = require('./index')
const { createUser, getAllUsers } = require('./Users')
const { createBakedGoods, getAllBakedGoods } = require('./Bakery'); 
const { createCandy, getAllCandy } = require('./Candy');
const { updateCart, createCart } = require('./Cart');
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
            "candyId" SERIAL PRIMARY KEY,
            "candyName" VARCHAR(255) UNIQUE NOT NULL,
            stock INTEGER,
            price NUMERIC,
            "candyDescription" VARCHAR(255) NOT NULL,
            image VARCHAR(255) UNIQUE
        );
        CREATE TABLE baked_goods(
            "bakedId" SERIAL PRIMARY KEY,
            "bakedGoodsName" VARCHAR(255) UNIQUE NOT NULL,
            stock INTEGER,
            price NUMERIC,
            "bakedDescription" VARCHAR(255) NOT NULL,
            image VARCHAR(255) UNIQUE
        );
        CREATE TABLE cart(
            "cartId" SERIAL PRIMARY KEY,
            "usersId" INTEGER REFERENCES users(id),
            "cartStatus" VARCHAR (255) DEFAULT 'active' 
        );
        CREATE TABLE cart_items(
            "cartItemsId" SERIAL PRIMARY KEY,
            "cart_id" INTEGER REFERENCES cart("cartId"),
            "price_bought_at" NUMERIC
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

async function createInitialBakery () {
    console.log("Starting to create users:")
    try {
        await createBakedGoods({
            name: 'cake',
            stock:'1000',
            price:'10000',
            description: 'dont eat'
        });
        await createBakedGoods({
            name: 'cupcake',
            stock:'2000',
            price:'20000',
            description: 'dont eat pt2'
        });
        await createBakedGoods({
            name: 'cake',
            stock:'3000',
            price:'30000',
            description: 'dont eat pt3'
        });
        await createBakedGoods({
            name: 'cake',
            stock:'4000',
            price:'40000',
            description: 'dont eat pt4'
        });
        console.log("Finished creating bakery:");
    } catch (error) {
        console.error("Error when creating bakery");
        console.log(error)
    }
};
async function createInitialCandy() {
    console.log("Creating initial candy")
    try {
        await createCandy({
            name: "lolipops",
            stock: "1000",
            description: "lick till its gone",
            price: 5.50
        });
        await createCandy({
            name: "gum drops",
            stock: "1000",
            description: "Its not a jaw breaker but dont bite",
            price: 5.50
        });
        await createCandy({
            name: "Caramel Nips",
            stock: "1000",
            description: "Suck it good",
            price: 5.50
        });
        await createCandy({
            name: "Gummy Bears",
            stock: "1000",
            description: "They are headless if you chew",
            price: 5.50
        });
        await createCandy({
            name: "Jaw Breaker",
            stock: "1000",
            description: "Lick! DO NOT BITE!",
            price: 5.50
        });
        
        console.log("Finished creating initial candy")
    } catch (error) {
        console.error(error.detail)
    }
}

// async function createInitialCart() {
//     try {
//         console.log("Starting to createInitialCart: ")

        
//     } catch (error) {
//         console.error(error.detail)
//     }
// }


async function testDB() {
    try {
        console.log("calling getAllUsers")
        const user = await getAllUsers();
        console.log("results ", user)

        console.log("calling getbakerygoods")
        const bakedGoods = await getAllBakedGoods();
        console.log('results', bakedGoods)

        console.log("Calling get all Candy")
        const candyGoods = await getAllCandy();
        console.log("Results", candyGoods)

        console.log("Calling create Carts: ")
        const newCart = await createCart();
        console.log("Results", newCart)
    } catch (error) {
        console.log("Error during testDB");
        console.log(error.detail);
    }
}


async function rebuildDB() {
    try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialBakery();
    await createInitialCandy();

    } catch (error) {
    console.log("Error during rebuildDB:")
    console.log(error.detail);
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());