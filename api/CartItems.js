const express = require("express");
const cartItemsRouter = express.Router();
const {
    createCartItem,
    updateCartItems,
    removeBakedCartItem,
    removeCandyCartItem,
    getCartItemsById,
    getCartItemByBakedId,
    getCartItemByCandyId,
    attachCartItemsToCart,
    getAllCartItemsByUser,
    destroyCartItems
} = require('../db/CartItems')
const { getCartById } = require('../db/Cart')


cartItemsRouter.delete("/:cartItemsId", async (req, res, next) => {
    const {cartItemsId} = req.params;
    try {
        const cartItems = await getCartItemsById(cartItemsId);
        const cart = await getCartById(cartItems.cartId);
        if (req.user.id === cart.usersId) {
            const removeItem = await destroyCartItems(cartItemsId);
            res.send(removeItem)
        } else {
            next({message: "Error: Please login to remove from cart"})
        }
    } catch ({ message }) {
        next({ message })
    }
});

module.exports = {
    cartItemsRouter
}