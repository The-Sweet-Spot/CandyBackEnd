const { client } = require("./index") 

// FN: createCart - Finished
async function createCart ( { usersId, cartStatus } ) {
    try {
        const {rows: [cart] } = await client.query(`
        INSERT INTO cart("usersId", "cartStatus")
        VALUES($1, $2)
        RETURNING *;
        `, [ usersId, cartStatus]
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
 // Updates: fields 
    // rewirte so the cartStatus is always set to be able to be updated;  active, etc

// FN: updateCartStatus
async function updateCartStatus({ usersId }) {
    try {
      const {rows: [cart]} = await client.query(`
          UPDATE cart
          SET cartStatus = true
          WHERE carts.usersID= $1
          RETURNING *;
        `,
        [usersId]
      );

      return cart;
    } catch (error) {
      console.error('Error Updating Cart Status! ');
      console.log(error);
    }
  }

module.exports = {
    createCart,
    updateCart,
    updateCartStatus
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