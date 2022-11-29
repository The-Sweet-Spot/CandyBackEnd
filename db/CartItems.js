const { client } = require('./index')
const {getAllBakedGoodsById} = require('./Bakery')
const {getCandyById} = require('./Candy')



async function createCartItem({ cartId, price_bought_at, bakedId, candyId }) {
    try {
        const { rows: [ cartItem ] } = await client.query(`
        INSERT INTO cart_items("cartId", "price_bought_at", "bakedId", "candyId")
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `, [cartId, price_bought_at, bakedId, candyId])
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
        SELECT cart.*, cart_items."cartId", cart_items."cartItemsId", cart_items."cartItemsId" AS "cartItemsId"
        FROM cart
        JOIN cart_items ON baked_goods."bakedId"candy=cart_items."candyId"
        WHERE cart_items."cartItemsId" IN (${idString});
        `)
        for (const cart_items of cart_items) {
            const cartToAdd = cart.filter((cart) => {
                return cart.cartId == cart_items.cartItemsIid
            }
            )
            cart_items.cart = cartToAdd
        }   
        return cart
    } catch (error) {
        console.log(error)
    }
}
async function updateCartItems(cartItemsId, fields = {}) {
    if (fields.cartItemsId) delete fields.cartItemsId;
    const keys = Object.keys.map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');
    try {
        if(!!keys.length) {
            const { rows } = await client.query(`
            UPDATE "cart_items"
            SET ${ setString }
            WHERE "cartItemsId"=${ cartItemsId }
            RETURNING *;
        `, Object.values(fields));
        return rows;
        }
        if (!keys.length) {
            const candyStuff = await getCartItemByCandyId(candyId);
            const bakedStuff = await getCartItemByBakedId(bakedId);
            const productArr = [candyStuff, bakedStuff]
            return productArr;
        }
    } catch (error) {
        console.error(error)
    }
}


// async function getAllCartItems() {

//     try {
//         const { rows } = await client.query(`
//         SELECT cart_items.*, users.username AS "usersId"
//         FROM cart_items
//         JOIN users ON cart_items."usersId"=users.id;
//         `);
//         return attachCartItemsToCart(rows)
//     } catch (error) {
//         console.log(error)
//     }
// }

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
        const { rows: [cart_items] } = await client.query(`
        SELECT *
        FROM cart_items
        WHERE "cartItemsId"= $1;
        `, [cartItemsId])
        if (!cart_items) {
            return null
        }
        return cart_items;
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
    // getAllCartItems,
    getCartItemByBakedId,
    getCartItemByCandyId,
    getCartItemsById,
    attachCartItemsToCart,
    getAllCartItemsByUser,
    destroyCartItems
}

