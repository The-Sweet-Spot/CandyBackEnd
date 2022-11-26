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

async function getAllBakedGoodsById (bakedId) {
    try {
        const { rows: [bakery] } = await client.query (`
        SELECT *
        FROM baked_goods
        WHERE id=$1
        `, [bakedId]);

        return bakery;
    } catch (error){
        console.log("Error getting baked goods by id")
        throw error;
    }
}

async function getAllBakedGoodsByName (bakedGoodsName) {
    try{
        const { rows : [bakery] } = await client.query(`
        SELECT *
        FROM baked_goods
        WHERE id=$1
        `, [bakedGoodsName]);

        return bakery;
    } catch (error) {
        console.log("Error getting baked goods by name")
        throw error;
    }
}

async function createBakedGoods ({bakedGoodsName, bakedDescription, stock ,price}) {
    try{
        const { rows: [bakery] } = await client.query(`
        INSERT INTO baked_goods ("bakedGoodsName", "bakedDescription", stock, price)
        VALUES($1, $2, $3, $4)
        ON CONFLICT ("bakedGoodsName") DO NOTHING
        RETURNING *;
        `, [bakedGoodsName, bakedDescription, stock, price]);

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