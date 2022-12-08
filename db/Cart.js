const { client } = require("./index") 

// FN: createCart - Finished
async function createCart ( { usersId, active } ) {
    try {
        const {rows: [cart] } = await client.query(`
        INSERT INTO cart("usersId", active)
        VALUES($1, $2)
        RETURNING *;
        `, [usersId, active]
        );

        return cart 
    } catch (error) {
        console.error("Error createCart: ")
        console.log(error)
    }
}

// FN: updateCart
async function updateCart (id, fields = {} ) {
    if (fields.id) delete fields.id;
    const keys = Object.keys(fields)
    const setString = keys.map(
        (key, index) => `"${key}" =$${index+1}`
    ).join(', ')
    
    try {
        if (!!keys.length) {
        const {rows} = await client.query(`
            UPDATE cart
            SET ${setString}
            WHERE id=${id}
            AND UPDATE cart
            SET 
            RETURNING *;
        `,Object.values(fields))

        return rows;}
        // }if(!keys.length) {
        //     return await 
        // }
    } catch (error) {
        console.error("Error updating cart: ")
        console.log(error)
    }
}

// FN: getCartByUsersId
async function getCartByUserId(usersId) {
    try {
        const { rows: [cart] } = await client.query(`
        SELECT *
        FROM cart
        WHERE "usersId"=$1 AND active=true;
        `, [usersId]
        );
        return cart
        
    } catch (error) {
        console.log(error)

        
    }
}

// FN: getAllCarts - This is only needed for admin, not public
async function getAllCarts() {
    try {
        const {rows: [cart]} = await client.query(`
            SELECT *
            FROM cart;
            ` 
        ); return cart
    } catch (error) {
        console.error("Error getting cart by id:")
        console.log(error)
    }
}

// FN: updateCartStatus
async function updateCartStatus(active, usersId) {
    try {
    const {rows: [cart]} = await client.query(`
        UPDATE cart
        SET active=$1
        WHERE cart."usersId"=$2
        RETURNING *;
        `,
        [active, usersId]
    );
        console.log("cart", cart)
    return cart;
} catch (error) {
    console.error('Error Updating Cart Status! ');
    console.log(error);
    }
}
async function getCartById(cartId) {
    try {
        const {rows: [cart]} = await client.query(`
        SELECT *
        FROM cart
        WHERE "cartId"=$1;
        `, [cartId])
        return cart
    } catch (error) {
        console.error(error)
    }
}
module.exports = {
    createCart,
    getAllCarts,
    getCartByUserId,
    updateCart,
    updateCartStatus,
    getCartById
};





// // Scratch 
// async function updateCart ({usersId, cartStatus} ) {
//     if (condition) {
//         try {
//             const {rows: [cart] } = await client.query(`
//             UPDATE cart
//             SET candyID = 1
//             WHERE cart.usersId= $1
//             AND SET bakedId = 0
//             WHERE cart.usersId= $1
//             AND SET cartStatus = 'active'
//             RETURNING*;            
//             `,
//             [usersId, cartStatus]

//             );
//             return cart;
//         } catch (error) {
//             console.error('Error Updating Cart Candy Purchase: ');
//             console.log(error);
//         }
//     }else {
//         try {
//             const {rows: [cart] } = await client.query(`
//             UPDATE cart
//             SET candyID = 0
//             WHERE cart.usersId= $1
//             AND SET bakedId = 1
//             WHERE cart.usersId= $1
//             AND SET cartStatus = 'active'
//             RETURNING*;            
//             `,
//             [usersId, cartStatus]

//             );
//             return cart;
//         } catch (error) {
//             console.error('Error Updating Cart BakedGood Purchase: ');
//             console.log(error);
//         }
//     }
// }
