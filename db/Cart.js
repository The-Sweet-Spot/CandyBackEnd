const { client } = require("./index") 

// FN: createCart - Finished
async function createCart ( { userId, cartId } ) {
    try {
        const {rows: [cart] } = await client.query(`
            INSERT INTO cart("userId", "cartId")
            VALUES ($1, $2)
            RETURNING *;
            `, [userId, cartId]
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

module.exports = {
    createCart,
    updateCart,
};