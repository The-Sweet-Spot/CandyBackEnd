const { client } = require('./index')
const {getAllBakedGoodsById} = require('./Bakery')
const {getCandyById} = require('./Candy')



async function createCartItem({ cartId, cartItemsId, price_bought_at }) {
    try {
        const { rows: [ cartItem ] } = await client.query(`
        INSERT INTO cart_items("cartId", "cartItemsId", "price_bought_at")
        VALUES($1, $2, $3)
        RETURNING *;
        `, [cartId, cartItemsId, price_bought_at])
        return cartItem
    } catch (error) {
        console.log(error)
    }
}

async function getCartItemByCandyId({candyId}) {
    try {
        const { rows: [ cartItem ] } = await client.query(`
        SELECT *
        FROM cart_Items
        WHERE id=$1;
        `, [candyId])
        return cartItem
    } catch (error) {
        console.log(error)
    }

}
async function getCartItemByBakedId({bakedId}) {
    try {
        const { rows: [bakedItem] } = await client.query(`
        SELECT *
        FROM cart_Items
        WHERE "cartItemsId"=$1;
        `, [bakedId])
        return bakedItem
    } catch (error) {
        console.log(error)
    }
}


async function attachCartItemsToCart(cart_items) {
    const idString = cart_items.map((el, ind) => {
        return `$${ind + 1}`
    }) .join(", ")
    const idArr = cart_items.map((el) => {
        return el.id
    })
    try {
        const { rows: [cart] } = await client.query(`
        SELECT cart.*, "cart_items"."cart_id", "cart_items"."cart_item_id", "cart_items".cartItemsId AS "cartItemsId"
        FROM cart
        JOIN cart ON "baked_goods"."bakedId"candy=cart_items."candyId"
        WHERE cart_items."cartItemsId" IN (${idString});
        `, idArr)
        for (const cart_Items of cart_items) {
            const cartToAdd = cart.filter((activity) => {
                return cart.cartId == cart_items.cartItemsIid
            }
            )
            cartItems.cart = cartToAdd
        }   return cart
    } catch (error) {
        console.log(error)
    }
}
async function updateCartItems(cart_item_id, fields = {}) {
    if (fields.cart_item_id) delete fields.cart_item_id;
    const keys = Object.keys.map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');
    try {
        if(!!keys.length) {
            const { rows } = await client.query(`
            UPDATE "cart_items"
            SET ${ setString }
            WHERE "cart_item_id"=${ cart_item_id }
            RETURNING *;
        `, Object.values(fields));
        return rows;
        }
        if (!keys.length) {
            return await getCartItemByCandyId(candyId);
            // return await getCartItemByBakedId(bakedId);
        }
    } catch (error) {
        console.error(error)
    }
}


async function getAllCartItems() {

    try {
        const { rows } = await client.query(`
        SELECT cart_items.*, users.username AS "usersId"
        FROM cart_items
        JOIN users ON cart_items."usersId"=users.id;
        `);
        return attachCartItemsToCart(rows)
    } catch (error) {
        console.log(error)
    }
}

async function removeCandyCartItem(candyId) {
    try {
        await client.query(`
        DELETE FROM cart_items
        WHERE "candyId"=$1;
        `, [candyId])
    } catch (error) {
        console.error(error)
    }
}
async function removeBakedCartItem(bakedId) {
    try {
        await client.query(`
        DELETE FROM cart_items
        WHERE "bakedId"=$1;
        `, [bakedId])
    } catch (error) {
        console.error(error)
    }
}


async function getAllCartItemsByUser({ username }) {
    try {
        const { rows } = await client.query(`
        SELECT cart_items.*, users.username
        FROM cart_items
        JOIN users ON cart_items."usersId"=users.Id
        WHERE "username"=$1;
        `, [username]
        );
        return (rows);
    } catch (error) {
        console.log(error)
    }
}
async function getCartItemsById(cartItemsId) {
    try {
        const { rows: [cartItems] } = await client.query(`
        SELECT *
        FROM cart_items
        WHERE "cartItemsId"= $1;
        `, [cartItemsId])
        if (!cartItems) {
            return null
        }
        return cartItems;
    } catch (error) {
        console.error(error)
    }
}
async function destroyCartItems(cartItemsId) {
    try {
        await client.query(`
        DELETE FROM "cart_items"
        WHERE "cartItemsId"=$1;
        `, [cartItemsId])
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createCartItem,
    updateCartItems,
    removeBakedCartItem,
    removeCandyCartItem,
    getAllCartItems,
    getCartItemByBakedId,
    getCartItemByCandyId,
    getCartItemsById,
    attachCartItemsToCart,
    getAllCartItemsByUser,
    destroyCartItems
}

