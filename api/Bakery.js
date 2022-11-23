const express = require('express'); 
const bakeRouter = express.Router();
const jwt = require ('jsonwebtoken');
const { getAllBakedGoods, getAllBakedGoodsById, getAllBakedGoodsByName } = require('../db/Bakery');

//GET/bakedGoods
bakeRouter.get('/', async (req, res, next) =>{
    try{
        const bakedgoods = await getAllBakedGoods();
        res.send(
            bakedgoods
        ) 
    } catch (error) {
        console.log("error getting all baked goods")
    }
});

//GET/bakedGoodsById 
bakeRouter.get('/:bakedid', async (req, res, next) => {
    try {
    const bakedGoodsById = await getAllBakedGoodsById(bakedId)
    console.log(bakedGoodsById)
    
        res.send(
            bakedGoodsById
        )
    } catch (error) {
        console.log(error)
    }
});

//GET/bakedGoodsByName 
bakeRouter.get('/:name', async (req, res, next) => {
    try{
        const bakedGoodsByName = await getAllBakedGoodsByName(bakedGoodsName)
        console.log(bakedGoodsByName)

        res.send(
            bakedGoodsByName
        )
    } catch (error) {
        console.log(error)
    }
});

module.exports = {bakeRouter}