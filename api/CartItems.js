const express = require("express");
const cartItemsRouter = express.Router();
const {
    createCartItem,
    updateCartItems,
    getCartItemsById,
    attachCartItemsToCart,
    getAllCartItemsByUser,
    destroyCartItems,
    fetchCartItemsByCartId
} = require('../db/CartItems')
const { getCartById, getCartByUserId } = require('../db/Cart')

// cartItemsRouter.get("/:cartItemsId", async (req, res, next) => {
//     try {
//         const { cartItemsId } = req.params
//         const currentItemsInCart = await getCartItemsById(cartItemsId)
//         res.send(currentItemsInCart)
//     } catch (error) {
//         console.error(error)
//     }
// })
cartItemsRouter.get("/mycartitems", async (req, res, next) => {
    try {
        console.log("starting handler")
    
        console.log("this is req.user for cart itmes", req.user)
        const isUserWithCart = await getCartByUserId(req.user.usersId)
        console.log("is user with cart?", isUserWithCart)
        if (req.user.usersId === isUserWithCart.usersId) {
        const getMyStuffInTheCart = await fetchCartItemsByCartId(isUserWithCart.cartId)
        console.log("Finish running function", isUserWithCart.cartId)
        console.log("get stuff in the cart", getMyStuffInTheCart)
        res.send(getMyStuffInTheCart)
        } else {
            res.status(401).send({message: "You are IMPOSTER!"})
        }
    } catch (error) {
        console.error(error)
    }
})
cartItemsRouter.post("/add/:sweetsId", async (req, res, next) => {
    try {
        const {sweetsId} = req.params
        const {cartId, price_bought_at, usersId} = req.body
        console.log("this is req.user", req.user.usersId, usersId)
        if (req.user.usersId === usersId){

            const fetchingCartItems = await attachCartItemsToCart({sweetsId, cartId, price_bought_at})
            console.log("fetchings cart items", fetchingCartItems)
            res.send(fetchingCartItems)
        } else {
            res.status(401).send({message: "You are IMPOSTER!"})
        }
    
    } catch (error) {
        console.error(error)
    }
})
cartItemsRouter.delete("/:cartItemsId", async (req, res, next) => {
    const {cartItemsId} = req.params;
    try {
        const cartItems = await getCartItemsById(cartItemsId);
        const cart = await getCartById(cartItems.cartId);
        if (req.user.usersId === cart.usersId) {
            const success = await destroyCartItems(cartItemsId);
            res.send({success})
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