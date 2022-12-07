const express = require("express");
const { getAllBakedGoodsById } = require("../db/Bakery");
const { getCandyById } = require("../db/Candy");
const { createCart, updateCart, getCartByUserId, updateCartStatus, getAllCarts, getCartById, } = require("../db/Cart");
const { attachCartItemsToCart, getCartItemsByCartId, fetchCartItemsByCartId } = require('../db/CartItems');
const { requireUser } = require('./utilities')
const cartRouter = express.Router();

// Create Cart
cartRouter.get("/", async (req, res, next) => {
    try {
        const response = await getAllCarts();
        res.send(response);
    } catch (error) {
        console.log(error);
        
    }
})

// get cart 
cartRouter.post("/:usersId", async (req, res, next) => {
    // const { usersId, active } = req.body;
console.log("Is this working", req.body)
    try {
        const {usersId} = req.params
        const active = true
        const existingCart = await getCartByUserId(usersId,true);
        console.log("statement", existingCart.cartId)
        if(existingCart.cartId){
            res.send(existingCart)
        } else {
        const newCart = await createCart({
            usersId,
            active
        });
        res.send(newCart);
        
        }
    } catch (error) {
        console.error(error);
    }
});
// cartRouter.get("/test", async (req, res, next) => {
//     try {
//         const fetchingCartItems = await attachCartItemsToCart(3)
//         res.send(fetchingCartItems)
//     } catch (error) {
//         console.log(error)
//     }
// })
// cartRouter.post("/add/:sweetsId", async (req, res, next) => {
//     try {
//         const {sweetsId} = req.params
//         const {cartId, price_bought_at} = req.body
//         console.log("this is req.user", req.user.id, cart.usersId, cart)
//         if (req.user.id === cart.usersId){

//         const fetchingCartItems = await attachCartItemsToCart({sweetsId, cartId, price_bought_at})
//         res.send(fetchingCartItems)
//     } else {
//             res.status(401).send({message: "You are IMPOSTER!"})
//         }
    
//     } catch (error) {
//         console.error(error)
//     }
// })
// usersId
cartRouter.get("/:usersId", async (req, res, next) => {
    const { usersId } = req.params
    try {
        const newCartId = await getCartByUserId (usersId)
        res.send (newCartId)

    } catch (error) {
        console.log(error)
    }
});
// build a patch route for updating the status
cartRouter.patch("/updateCart", requireUser, async  (req, res, next) => {
    try {
        const { active, usersId } = req.body;
        // const updatedActivity = {}
        // updatedActivity.cartId = userId
        if (usersId === req.user.id) {
            const updateStatus = await updateCartStatus(active, usersId)
            res.send("Your cart was Update!", updateStatus)
        } else {
            next({
                name: 'Cart does not match logged in user',
                message: 'Please login'
            })
        }

    } catch (error) {
        console.error(error)
    }
})

// cartItemsId patch
// cartRouter.patch("/:usersId/:cartItemsId", async (req, res, next) => {
//     try {
//         const { cartItemsId } = req.params;
//         const updateCart = {};
//         updateCart.id = cartItemsId;
//         if (!(await getCartItemsBy(cartItemsId))) {
//                 // make sure this fn is created & imported
//             next({
//                 name: "CartItemsById",
//                 message: `Cart named ${cartId} not found`,
//                 error: "Error! ",
//             });
//         } if (await getCartByUserId(usersId)) {
//             next({
//                 name: "UsersId already present",
//                 message: `A Cart with the usersId ${usersId} already exists`,
//                 error: "Error! ",
//             });
//         } else {
//             const response = await updateCart(active);
//                 // ?
//             if (response) {
//             res.send(response);
//             } else {
//             next({
//                 name: "No Carts To Update: ",
//                 message: `No Cart to update.`,
//                 error: "Error! ",
//             });
//         }
//     }
//     } catch (error) {
//     next(error);
//     }
// });

module.exports = {cartRouter};

// get candy
// cartRouter.post('/:cartId/candy', async (req, res, next) => {
//     const { candyId } = req.params
//     try {
//         const candy = await getCandyById(candyId);
//         res.send({ candy })
//     } catch (error) {
//         console.log(error)
//     }
// });

// // GET/baked
// cartRouter.post('/:cartId/baked', async (req, res, next) => {
//     const { bakedId } = req.params
//     try {
//         const bakery = await getAllBakedGoodsById(bakedId);
//         res.send({ bakery })
//     } catch (error) {
//         console.log(error)
//     }
// });