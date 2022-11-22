const { client } = require("./index") 

async function getAllBakedGoods () {
    try{
        const { rows } = await client.query(`
        SELECT *
        FROM baked_goods;
`);
        return rows; 
    } catch (error) {
        console.log("Error getting baked goods")
        throw error;
    }
}

async function getAllBakedGoodsById (bakeid) {
    try {
        const { rows: [bakery] } = await client.query (`
        SELECT *
        FROM baked_goods
        WHERE id=$1
        `, [bakeid]);

        return bakery;
    } catch (error){
        console.log("Error getting baked goods by id")
        throw error;
    }
}

async function getAllBakedGoodsByName (name) {
    try{
        const { rows : [bakery] } = await client.query(`
        SELECT *
        FROM baked_goods
        WHERE id=$1
        `, [name]);

        return bakery;
    } catch (error) {
        console.log("Error getting baked goods by name")
        throw error;
    }
}

async function createBakedGoods ({name, description, stock ,price}) {
    try{
        const { rows: [bakery] } = await client.query(`
        INSERT INTO baked_goods (name, description, stock, price)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `, [name, description, stock, price]);

        return bakery;
    } catch (error) {
        console.log ("Error creating baked goods")
        throw error;
    }
}

module.exports = {
    getAllBakedGoods,
    getAllBakedGoodsById,
    getAllBakedGoodsByName,
    createBakedGoods
}