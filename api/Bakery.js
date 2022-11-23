const express = require('express'); 
const bakeRouter = express.Router();
const jwt = require ('jsonwebtoken');
const { getAllBakedGoods } = require('../db/Bakery');
const {getAllBakedGoodsById} = require('../db/Bakery')
const {getAllBakedGoodsByName} = require('../db/Bakery')

//GET/bakedGoods
bakeRouter.get('/', async (req, res, next) =>{
    try{
        const bakedgoods = await getAllBakedGoods();
        res.send({
            bakedgoods
        }) 
    } catch (error) {
        console.log("error getting all baked goods")
    }
});

//GET/bakedGoodsById 
bakeRouter.get('/:bakeid/baked_goods', async (req, res, next) => {
    try {
    const bakedGoodsById = await getAllBakedGoodsById(bakeid. bakeid)
    console.log(bakedGoodsById)
    
        res.send({
            bakedGoodsById
        })
    } catch (error) {
        console.log(error)
    }
});

//GET/bakedGoodsByName 
bakeRouter.get('/:name/back_goods', async (req, res, next) => {
    try{
        const bakedGoodsByName = await getAllBakedGoodsByName(name. name)
        console.log(bakedGoodsByName)

        res.send({
            bakedGoodsByName
        })
    } catch (error) {
        console.log(error)
    }
});

module.exports = bakeRouter