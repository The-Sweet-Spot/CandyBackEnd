const express = require("express");
const { createCart, updateCart, updateCartStatus, getAllCarts } = require("../db/Cart");
const { getCartById } = require("../db/Cart");
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
        const existingCart = await getCartById(cartId);

        if (existingCart) {
            next({
                name: "Existing Cart",
                message: `Cart name ${cartId} already exist!`,
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

cartRouter.get("/:cartId", async (req, res, next) => {
    const { cartId } = req.params
    try {
        const newCartId = await getCartById (cartId)
        res.send (newCartId)

    } catch (error) {
        console.log(error)
    }
});

module.exports = {cartRouter};

// comment so i can push


cartRouter.post("/", async (req, res, next) => {
    //   const { cartId, usersId, active } = req.body;
    const {cartId, usersId, active} = req.params
    try {
        const newCart = await createCart({
            cartId, usersId, active
        });
        res.send(newCart);
        } catch ({ name, message }) {
        next({ name, message });
        }
    });