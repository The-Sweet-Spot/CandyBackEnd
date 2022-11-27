const express = require("express");
const { createCart, updateCart, updateCartStatus } = require("../db");
const cartRouter = express.Router();

// Create Cart
cartRouter.post("/", async (req, res, next) => {
  const { usersId, cartStatus } = req.body;

    try {
        const newCart = await createCart({
            usersId, cartStatus
        });

        res.send({
            message: "New Cart Created!",
            newCart: newCart });
    } catch (error) {
        next({ message: "CART ERROR: " });
    }
});

module.exports = cartRouter;