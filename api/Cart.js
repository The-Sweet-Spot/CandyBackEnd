const express = require("express");
const { getAllBakedGoodsById } = require("../db/Bakery");
const { getCandyById } = require("../db/Candy");
const { createCart, updateCart, updateCartStatus, getAllCarts } = require("../db/Cart");
const { getCartByUserId } = require("../db/Cart");
const { getCartItemsBy } = require('../db/CartItems');
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
cartRouter.post("/", async (req, res, next) => {
//   const { cartId, usersId, active } = req.body;

    try {
        const existingCart = await getCartByUsersId(usersId);

        if (existingCart) {
            next({
                name: "Existing Cart",
                message: `Users cart ${usersId} already exist!`,
                error: "error"
            })
        }
        const newCart = await createCart({
            cartId,
            usersId,
            active
        });
        res.send(newCart);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

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
cartRouter.patch("/:cartId", requireUser, async  (req, res, next) => {
    try {
        const { cartId } = req.params;
        const { active } = req.body;
        const updatedActivity = {}
        updatedActivity.cartId = cartId
        if (updatedActivity.cartId === req.user.userId) {
            const updateStatus = await updateCartStatus(active)
            res.send(updateStatus)
        } else {
            next({
                name: 'Cart Is Empty',
                message: 'Cannot check out until items are in the cart'
            })
        }

    } catch ({name, message}) {
        next({name, message})
    }
})

// post
// cartRouter.post/("/:usersId", async (req, res, next) => {}

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

// comment so I can push

// need patch to get cart status( active, pending, shipped, etc)

// patch update copy and paste

// get candy
cartRouter.post('/:cartId/candy', async (req, res, next) => {
    const { candyId } = req.params
    try {
        const candy = await getCandyById(candyId);
        res.send({ candy })
    } catch (error) {
        console.log(error)
    }
});

// GET/baked
cartRouter.post('/:cartId/baked', async (req, res, next) => {
    const { bakedId } = req.params
    try {
        const bakery = await getAllBakedGoodsById(bakedId);
        res.send({ bakery })
    } catch (error) {
        console.log(error)
    }
});