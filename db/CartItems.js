const { client } = require('./index')
const {
    createSweetProduct,
    getAllSweetProducts,
    getSweetProductByName,
    getSweetProductById
} = require('./SweetProducts')



async function createCartItem({ cartId, price_bought_at, sweetsId }) {
    try {
        const { rows: [ cartItem ] } = await client.query(`
        INSERT INTO cart_items("cartId", "price_bought_at", "sweetsId")
        VALUES($1, $2, $3)
        RETURNING *;
        `, [cartId, price_bought_at, sweetsId])
        return cartItem
    } catch (error) {
        console.log(error)
    }
}

async function getCartItemBySweetsId({sweetsId}) {
    try {
        const { rows: [ cartItem ] } = await client.query(`
        SELECT *
        FROM cart_Items
        WHERE id=$1;
        `, [sweetsId])
        return cartItem
    } catch (error) {
        console.log(error)
    }
}
async function getCartItemsByCartId(cartId) {
    try {
        const {rows} = await client.query(`
        SELECT *
        FROM cart_items
        WHERE "cartId"=$1;
        `,[cartId])
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function attachCartItemsToCart({cartId, sweetsId, price_bought_at}) {
    console.log("running attach items function")
    try {
        const { rows } = await client.query(`
        INSERT INTO cart_items("cartId", "sweetsId", price_bought_at)
        VALUES($1, $2, $3);
        `, [cartId, sweetsId, price_bought_at])
        // const itemsInUsersCart = await getAllSweetProducts()
        // const bakedGoodsItems = itemsInUsersCart.filter(cartItem => {
        //     return cartItem.departmentId === 1;
        // })
        // const candyGoodsItems = itemsInUsersCart.filter(cartItem => {
        //     return cartItem.departmentId === 2;
        // })
        return rows
    } catch (error) {
        console.log(error)
    }
}
async function fetchCartItemsByCartId(cartId) {
    console.log("fetching cart items by cart id")
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM cart_items
        JOIN sweet_products
        ON cart_items."sweetsId"=sweet_products."sweetsId"
        WHERE cart_items."cartId"=$1;
        `, [cartId])
        return rows
    } catch (error) {
        console.log(error)
    }
}


async function callAttachCartItemsToCart() {
    try {
        await attachCartItemsToCart(3)
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
            const candyStuff = await getAllSweetProducts(departmentId(2));
            const bakedStuff = await getAllSweetProducts(departmentId(1));
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
    getCartItemBySweetsId,
    getCartItemsById,
    attachCartItemsToCart,
    getAllCartItemsByUser,
    destroyCartItems,
    getCartItemsByCartId,
    fetchCartItemsByCartId
}

