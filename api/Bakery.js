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
bakeRouter.get('/:bakedId', async (req, res, next) => {
    const {bakedId} = req.params 
try {
    const newBakedId = await getAllBakedGoodsById (bakedId)
    res.send (newBakedId)

    } catch (error) {
        console.log(error)
    }
});

//GET/bakedGoodsByName 
// bakeRouter.get('/:bakedId/bakedGoodsName', async (req, res, next) => {
//     const { bakedGoodsName } = req.body 

//     try{
//         const nameOfBakedGoods = await getAllBakedGoodsByName(bakedGoodsName)
//         console.log(nameOfBakedGoods)

//         res.send(nameOfBakedGoods)
//     } catch (error) {
//         console.log(error)
//     }
// });

module.exports = {bakeRouter}
