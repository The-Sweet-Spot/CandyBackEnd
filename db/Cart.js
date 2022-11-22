const { client } = require("./index") 

// FN: createCart - Finished
async function createCart ( { userId, sessionId } ) {
    try {
        const {rows: [cart] } = await client.query(`
            INSERT INTO cart("userId", "sessionId")
            VALUES ($1, $2)
            RETURNING *;
            `, [userId, sessionId]
        );
        return cart 
    } catch (error) {
        console.error("Error createCart: ")
        console.error(error.detail)
    }
}

// FN: getAllCarts - NOT FINISHED!!
async function getAllCarts() {
    try {
        const { rows: [cart] } = await client.query(`
        SELECT cart.*, 
        FROM cart
        JOIN users ON cart. 
        `);

        return cart 
    } catch (error) {
        console.error("Error getAllCarts: ")
        console.error(error.detail)
    }
}

// FN: getCartById - FINISHED 
async function getCartById(id) {
    try {
        const {
          rows: [cart],
        } = await client.query(`
            SELECT *
            FROM cart
            WHERE id=$1
            `,
          [id]
        );
    
        return cart 
    } catch (error) {
        console.error("Error getCartById: ")
        console.error(error.detail)
    }
}

// FN: getCartByUser - NOT FINISHED!!
async function getCartByUser( { username } ) {
    try {
        const { rows } = await client.query(`
            SELECT cart.*,
            FROM cart
            JOIN users ON cart.
            WHERE username=$1;
            `,
          [username]
        );
    
        return (rows);
      } catch (error) {
        console.error("Error getCartByUser: ")
        console.error(error.detail)
    }
}

// FN: deleteCart - FINISHED
async function deleteCart(id) {
    await client.query(`
        DELETE FROM cart
        WHERE "cartId"=$1
      `,
        [id]
      );
    
      await client.query(`
        DELETE FROM cart
        WHERE id=$1
      `,
        [id]
      );
    }

module.exports = {
    createCart,
    getAllCarts,
    getCartById,
    getCartByUser,
    deleteCart,
};