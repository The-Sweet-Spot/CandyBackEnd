const express = require("express");
const { createCart, updateCart, updateCartStatus, getAllCarts } = require("../db/Cart");
const { getCartByUserId } = require("../db/Cart");
const { getCartItemsBy } = require('../db/CartItems');
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

// cartItemsId patch
cartRouter.patch("/:cartItemsId", async (req, res, next) => {
    try {
        const { cartItemsId } = req.params;
        const updateCart = {};
        updateCart.id = cartItemsId;
        if (name) {
            updateCart.id = cartItemsId;
        } if (goal) {
        updateRole.goal = goal;

        } if (!(await getCartItemsBy(cartItemsId))) {
                // make sure this fn is created & imported
            next({
                name: "CartItemsById",
                message: `Cart named ${cartId} not found`,
                error: "Error! ",
            });
        } if (await getCartByUserId(usersId)) {
            next({
                name: "UsersId already present",
                message: `A Cart with the usersId ${usersId} already exists`,
                error: "Error! ",
            });
        } else {
            const response = await updateCart(active);
                // ?
            if (response) {
            res.send(response);
            } else {
            next({
                name: "No Carts To Update: ",
                message: `No Cart to update.`,
                error: "Error! ",
            });
        }
    }
    } catch (error) {
    next(error);
    }
});
module.exports = {cartRouter};

// comment so I can push

// need patch to get cart status( active, pending, shipped, etc)

// patch update copy and paste
