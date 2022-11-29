// Step 1: Import Client & Exports
const { create } = require('domain');
const { client } = require('./index')
const { createUser, getAllUsers } = require('./Users')
const { createBakedGoods, getAllBakedGoods } = require('./Bakery'); 
const { createCandy, getAllCandy } = require('./Candy');
const { updateCart, createCart, getCartByUserId } = require('./Cart');
const { createCartItem, getCartItemsById } = require('./CartItems')
// Imports
// const {} = require('./Bakery');

// Step 2: User Methods
    // Method: dropTables
    async function dropTables(){
        try {
            console.log("Dropping tables: ");
            await client.query(`
            DROP TABLE IF EXISTS cart_items;
            DROP TABLE IF EXISTS cart;
            DROP TABLE IF EXISTS baked_goods;
            DROP TABLE IF EXISTS candy;
            DROP TABLE IF EXISTS users;
            `)
        
            console.log("Finished dropping tables")
        } catch(error){
            console.log("Error dropping tables")
            console.log(error.detail)
        }
    }

    // Method: createTables
async function createTables() {
    try {
        console.log('Starting to build tables...');
        await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            "is_active" BOOLEAN DEFAULT true
        );
        CREATE TABLE candy(
            "candyId" SERIAL PRIMARY KEY,
            "candyName" VARCHAR(255) UNIQUE NOT NULL,
            stock INTEGER,
            price NUMERIC,
            "candyDescription" VARCHAR(500) NOT NULL,
            image VARCHAR(500) UNIQUE
        );
        CREATE TABLE baked_goods(
            "bakedId" SERIAL PRIMARY KEY,
            "bakedGoodsName" VARCHAR(255) UNIQUE NOT NULL,
            stock INTEGER,
            price NUMERIC,
            "bakedDescription" VARCHAR(500) NOT NULL,
            image VARCHAR(500) UNIQUE
        );
        CREATE TABLE cart(
            "cartId" SERIAL PRIMARY KEY,
            "usersId" INTEGER REFERENCES users(id),
            active BOOLEAN DEFAULT true 
        );
        CREATE TABLE cart_items(
            "cartItemsId" SERIAL PRIMARY KEY,
            "cartId" INTEGER REFERENCES cart("cartId"),
            "bakedId" INTEGER REFERENCES baked_goods("bakedId"),
            "candyId" INTEGER REFERENCES candy("candyId"),
            "price_bought_at" NUMERIC
        );`);   

        console.log('Finished building tables!');
        } catch (error) {
        console.error('Error building tables!');
        console.log(error);
        }
    }

    // Method: createInitialUsers
async function createInitialUsers() {
    console.log("Starting to create users:")
    try {
        await createUser({
            username: 'dalron',
            password: 'dalron',
            email: 'dalron@gmail.com',
            is_active: true,
        });
        await createUser({
            username: 'john',
            password: 'john',
            email: 'john@gmail.com',
        });
        await createUser({
            username: 'marc',
            password: 'marc',
            email: 'marc@gmail.com',
        });
        await createUser({
            username: 'tori',
            password: 'tori',
            email: 'tori@gmail.com',
        });
        console.log("Finished creating users:");
    } catch (error) {
        console.error("Error when creating users:");
        console.log(error);
    }
};

async function createInitialBakery () {
    console.log("Starting to create users:")
    try {
        await createBakedGoods({
            bakedGoodsName: 'Red Velvet Cake',
            stock:'4000',
            price:'30.00',
            bakedDescription: 'Scarlet-colored chocolate layer cake. Layered with ermine icing',
            image:"https://houseofnasheats.com/wp-content/uploads/2019/01/Best-Homemade-Red-Velvet-Cake-Recipe-1.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'Pumpkin Pie',
            stock:'4000',
            price:'40.00',
            bakedDescription: 'This festive favorite that is a treat for everyone, any time of the year!',
            image:"https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-11/Classic-Pumpkin-Pie_1288.jpg?itok=E0whgTM5"
        });
        await createBakedGoods({
            bakedGoodsName: 'Oreo Pie',
            stock:'4000',
            price:'40.00',
            bakedDescription: 'This cool, creamy, easy Oreo pie is a delicious homemade no-bake dessert that will surely be a favorite with Oreo lovers!',
            image:"https://thedashleyskitchen.com/wp-content/uploads/2021/11/Inside-Slice-Decorated-Oreo-Pie-720x720.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: "Reese's Peanut Butter Pie",
            stock:'4000',
            price:'40.00',
            bakedDescription: "Who doesn't love chocolate and peanut butter? This irresistible Reeses Peanut Butter Pie has a bottom layer of fudge topped with creamy peanut butter filling studded with peanut butter cups. Try this peanut butter cup pie next time you're in need of a decadent dessert that turns heads",
            image:"https://www.allrecipes.com/thmb/tp2KdvR4oZv1AMuaUSq0qlCeYVo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/190359-peanut-butter-pie-Melissa-Goff-1x1-1-269e30588a7742b5a0046572e713ae1d.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'Cherry Pie',
            stock:'4000',
            price:'25.00',
            bakedDescription: 'Our baked cherry pies are made with the freshest cherries daily. Enjoy this delicacy after a meal, or during an event!',
            image:"https://images-gmi-pmc.edge-generalmills.com/a564f33d-0d34-46d2-9ecb-2a8fb9b0b391.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'Sweetest Pecan Pie',
            stock:'4000',
            price:'25.00',
            bakedDescription: 'This is a wonderfully rich, southern pecan pie that will have your whole family smiling and wanting more!',
            image:"https://images-gmi-pmc.edge-generalmills.com/2b31966f-9558-490a-b82b-c2018b288425.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'Dutch Apple Pie',
            stock:'4000',
            price:'25.00',
            bakedDescription: "America's favorite pie, made with a crumbly topping, and fresh granny-smith apples!",
            image:"https://res.cloudinary.com/hksqkdlah/image/upload/SFS_Dutch_Apple_Pie_419_ngrlq2.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'Banana Cream Pie',
            stock:'4000',
            price:'25.00',
            bakedDescription: "Satisfy your sweet tooth with this delicatable, homemade banana cream pie! It is irresisitibly sweet with a velvety smooth texture, you'll wish you bought more than one!",
            image:"https://www.spoonforkbacon.com/wp-content/uploads/2022/03/banana-cream-pie-recipe-card-500x500.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'Classic Key Lime Pie',
            stock:'4000',
            price:'25.00',
            bakedDescription: 'This sweet and tart Key Lime Pie is made with fresh Key Limes and topped with whipped cream!',
            image:"https://www.livewellbakeoften.com/wp-content/uploads/2021/05/Key-Lime-Pie-NEW-7s.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'French Silk Pie',
            stock:'4000',
            price:'40.00',
            bakedDescription: 'This creamy and indulgent pie combines flaky pie crust, smooth-as-silk chocolate filling, and fresh whipped cream on top. For the sweetest tooth, this will be more than satisfying!',
            image:"https://joyfoodsunshine.com/wp-content/uploads/2020/02/homemade-french-silk-pie-recipe-2.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'Hershey Sundae Pie',
            stock:'4000',
            price:'30.00',
            bakedDescription: 'A crunchy chocolate crust filled with chocolate crème filling and garnished with real HERSHEY’S® Chocolate Chips',
            image:"https://i.pinimg.com/originals/22/69/a3/2269a32b5b02004e81a89b711955beff.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'White Chocolate Macadamia Nut Cookies',
            stock:'4000',
            price:'25.00',
            bakedDescription: 'These white chocolate macadamia nut cookies are soft-baked style with extra chewy centers. They’re absolutely PACKED with white chocolate and salted macadamia nuts. Pack of 20!',
            image:"https://inbloombakery.com/wp-content/uploads/2022/04/featured-image-White-Chocolate-Macadamia-Nut-Cookies.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: "M&M Mini's Cookies",
            stock:'4000',
            price:'20.00',
            bakedDescription: 'These delicious M&M Cookies have chewy edges, soft centers, and they are packed with M&M Minis and chocolate chips! Pack of 20!',
            image:"https://butternutbakeryblog.com/wp-content/uploads/2021/10/best-mm-cookies.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'Classic Peanut Butter Blossom Cookies',
            stock:'4000',
            price:'30.00',
            bakedDescription: "Tender peanut butter cookies, made from scratch in a recipe that comes together quickly, are the base that sets the standard. Once they're out of the oven, Hershey's Kisses are immediately pressed into the warm cookies so that the dough cradles the candy and holds it in place. Once they're cooled and ready to eat, they're the perfect combination of silky chocolate and tender, sweet-salty peanut butter cookie—and you'd better believe they'll disappear fast! Pack of 20!",
            image:"https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipemediafiles/recipes/retail/x17/2018_peanut-blossom-cookies_5287_760x580.jpg?ext=.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'Chocolate Hazelnut Thumbprint Cookies',
            stock:'4000',
            price:'25.00',
            bakedDescription: 'Choco-holics, beware! These chocolate hazelnut thumbprint cookies have chocolate cookie dough rolled in hazelnuts and topped with chocolate hazelnut spread. Pack of 20!',
            image:"https://www.spendwithpennies.com/wp-content/uploads/2017/07/chocolate-hazelnut-thumbprint-cookies-2-500x375.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'Rose Cupcakes',
            bakedDescription: 'Made with puff pastry, sliced apples, and apricot jam.',
            stock:'2344',
            price:'20.00',
            image: "https://i.pinimg.com/originals/a4/ae/0f/a4ae0f0e91135543d4754284689a704d.jpg"
        });
        await createBakedGoods({
            bakedGoodsName: 'Orange-almond cake',
            bakedDescription: "A cake that is gluten-free, being a mixture of eggs, ground almonds, cooked, oranges, and sugar.",
            stock:'1209',
            price:'32.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2FSH6kG_WX3udDNUV_Mg7OHqUI9x8%3D%2F864x648%2Fimages.kitchenstories.io%2FrecipeImages%2FR1022-photofinal-4x3.jpg&w=768&q=90"
            });
        await createBakedGoods({
            bakedGoodsName: 'Braided Easter bread',
            bakedDescription:'A braided yeast bread that goes amazing if you full it with pudding,poppyseeds, chocolate, or nuts.',
            stock:'90',
            price:'10',
            image:"https://www.shelovesbiscotti.com/wp-content/uploads/2017/03/Italian-Easterbread-2.jpg"
            });
        await createBakedGoods({
            bakedGoodsName:'Irish Coffee Macarons',
            bakedDescription:'Delicious homemade coffee macarons',
            stock:'3023',
            price:'6.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2Fvj95oS29_z7wbBzlRTju6irsEL8%3D%2F864x648%2Fimages.kitchenstories.io%2FrecipeImages%2FBaileys_Macarons_1x1.jpg&w=1440&q=90"
            });
        await createBakedGoods({
            bakedGoodsName:'Flourless Peanut Butter Chocolate Chip Cookies',
            bakedDescription:'A gluten free delicious crispy, chocolatey peanunt butter cookies with coconunt sugar instead of brown sugar which adds a fine caramel flavor',
            stock:'1500',
            price:'5.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2FE6A0JYfo59vIt5Ac73RtWfNI7pw%3D%2F864x648%2Fimages.kitchenstories.io%2FrecipeImages%2FR662-photofinal-4x3.jpg&w=1440&q=90"
            });
        await createBakedGoods({
            bakedGoodsName:'Simple Lemon Poppy Seed Muffins',
            bakedDescription:'The batter is very quickly prepared, mixed with poppy seeds, which makes anamazing flavour that tastes exactly like lemon cake!',
            stock:'455',
            price:'3.50',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2FaZ7qQu4ExdysBl5TgRyUAaK3NH0%3D%2F768x576%2Fimages.kitchenstories.io%2FrecipeImages%2F11_06_SimpleLemonPoppySeedMuffins_titlePicture.jpg&w=1440&q=85"
            });
        await createBakedGoods({
            bakedGoodsName:'American Apple Pie',
            bakedDescription:'The juicy fruit filling is spiced with nutmeg, cinnamon, and lemon juice!',
            stock:'545',
            price:'20.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2F25kjJGzBX_LKxy1SxzjXKiCsclA%3D%2F864x648%2Fimages.kitchenstories.io%2FrecipeImages%2F04_25_AmericanApplePie_final.jpg&w=768&q=90"
            });
        await createBakedGoods({
            bakedGoodsName:'Classic German CheeseCake',
            bakedDescription:'A delicious classic german cheesecake that uses quark in the filling and leaves you wanting more!',
            stock:'600',
            price:'40.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2FEXCtXbexTwPRoxBaUmO3o92KnCI%3D%2F768x576%2Fimages.kitchenstories.io%2FrecipeImages%2FR743-photofinal-4x3.jpg&w=1440&q=85"
            });
        await createBakedGoods({
            bakedGoodsName:'Flourless Chocolate Cake',
            bakedDescription:'Have you ever wanted a chocolate cake but without the flour, and the taste iseven better, well this is the one for you, this cake well taste like a dream come true!',
            stock:'345',
            price:'30.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2FkXRoSzJVejQjtG1mI8RaIrJuvyI%3D%2F864x648%2Fimages.kitchenstories.io%2FrecipeImages%2FChocolateCake_Final.jpg&w=1440&q=90"
            });
        await createBakedGoods({
            bakedGoodsName:'Marbled Coffee Cake',
            bakedDescription:'I think we can agree that coffee is a very desired flavor that most enjoy, well thismarbled coffee cake is a very creamy delicious texture in the inside with a nice harded texture in the outside!',
            stock:'23',
            price:'45.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2FkBkxL4sNNOVgyDIIOtMY3W2yr8%3D%2F768x576%2Fimages.kitchenstories.io%2FrecipeImages%2FMarbleCake_final1.jpg&w=1440&q=85"
            });
        await createBakedGoods({
            bakedGoodsName:'Chewy Chocolate Chip Cookies',
            bakedDescription:'Do you enjoy a classic chocolate chip cookie, well this chewy one I am sure will leave you wanting more after santa is done with them.',
            stock:'5000',
            price:'4.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2FtfTXMLTDGaCDNsAlGve3KBTXn0%3D%2F768x576%2Fimages.kitchenstories.io%2FrecipeImages%2FChewyChocolateChipCookies_Final.jpg&w=768&q=85"
            });
        await createBakedGoods({
            bakedGoodsName:'Fudy Brownies',
            bakedDescription:'Do you like biting into a dessert and its just go smooth and flavorful to bite on, this fudy brownie well be perfect for those who enjoy a flavourful dessert, that comes in a box of 10!',
            stock:'2317',
            price:'20.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2FXDPmqs47Jynh1X68YmMWNEegToo%3D%2F768x576%2Fimages.kitchenstories.io%2FrecipeImages%2FRP16_02_18_4x3.jpg&w=1440&q=85"
            });
        await createBakedGoods({
            bakedGoodsName:'Blueberry Muffins',
            bakedDescription:'A classic muffin that never gets old, ours come in a pack of 12 and is freshly baked!',
            stock:'356',
            price:'15.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2F8UM5wRKIQ8MeG83iTDpmg2RWDQA%3D%2F768x576%2Fimages.kitchenstories.io%2FrecipeImages%2F06_09_KinderleichteBlaubeertoertchen_titlePicture.jpg&w=1440&q=85"
            });
        await createBakedGoods({
            bakedGoodsName:'Flan',
            bakedDescription:'A popular dessert in latin American countries, and for a good reason but this dessert will make you finish it in one sitting.',
            stock:'245',
            price:'30.00',
            image:"https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Creamy-Caramel-Flan_EXPS_FT20_2197_F_0723_1.jpg"
            });
        await createBakedGoods ({
            bakedGoodsName:'Sticky Ginger Pudding',
            bakedDescription:"You can never beat a pudding, unless it's spiced with ginger. And, don't forget the cream.",
            stock:'999',
            price:'10.00',
            image:"https://img.delicious.com.au/52dOVkJx/del/2020/06/sticky-ginger-pudding-133537-2.jpg"
            });
    
        console.log("Finished creating bakery:");
    } catch (error) {
        console.error("Error when creating bakery");
        console.log(error)
    }
};
async function createInitialCandy() {
    console.log("Creating initial candy")
    try {
        await createCandy({
            candyName: 'Air Heads',
            candyDescription: 'Air Heads are a tangy, taff-like, chewy candy coming in a complete assortment of flavors. You might even find some special edition flavors for the holidays.',
            stock: 1000,
            price: 1.35,
            image: "https://i5.walmartimages.com/asr/99ba3cd5-0621-4609-b992-f544f2a8fb3c_1.20291b7fdacd346a80e4000e0fc93a0f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        await createCandy({
            
        });
        
        console.log("Finished creating initial candy")
    } catch (error) {
        console.error(error.detail)
    }
}
async function createInitialCart() {
    try {
        // console.log('Starting to Create Carts:');
        // const {
        //     cartId, active
        // } = await createCart(
        //     1, true
        // )
        console.log(" This is cart one: ")
        await createCart({
            cartId: 1,
            usersId: 1,
            active: true          
        });
        await createCart({
            cartId: 2,
            usersId: 2,
            active: true            
        });
        await createCart({
            cartId: 3,  
            usersId: 3,
            active: true          
        });
        await createCart({
            cartId: 4,  
            usersId: 4,
            active: true          
        });
        console.log("Finished creating initial cart: ")
    } catch (error) {
        console.error('Error Creating Initial Carts: ');
        console.log(error);
    }
}

async function createInitialCartItems() {
    try {
        console.log("creating initial cart items for cart")
        await createCartItem({
            cartId: 1,
            cartItemsId: 1,
            bakedId: 1,
            candyId: 4,
            price_bought_at: 5.00
        });
        await createCartItem({
            cartId: 2,
            cartItemsId: 2,
            bakedId: 2,
            candyId: 3,
            price_bought_at: 5.00
        });
        await createCartItem({
            cartId: 3,
            cartItemsId: 3,
            bakedId: 1,
            candyId: 5,
            price_bought_at: 5.00
        });
        // extra 4
        await createCartItem({
            cartId: 1,
            cartItemsId: 4,
            bakedId: 1,
            candyId: 5,
            price_bought_at: 5.00
        });
        // 5
        await createCartItem({
            cartId: 2,
            cartItemsId: 5,
            bakedId: 2,
            candyId: 4,
            price_bought_at: 5.00
        });
        // 6
        await createCartItem({
            cartId: 3,
            cartItemsId: 6,
            bakedId: 2,
            candyId: 2,
            price_bought_at: 5.00
        });
        console.log("Finished creating cart items")
    } catch (error) {
        console.error(error)
    }
}

async function testDB() {
    try {
        console.log("calling getAllUsers")
        const user = await getAllUsers();
        console.log("results ", user)

        console.log("calling getbakerygoods")
        const bakedGoods = await getAllBakedGoods();
        console.log('results', bakedGoods)

        console.log("Calling get all Candy")
        const candyGoods = await getAllCandy();
        console.log("Results", candyGoods)

        console.log("Calling Carts: ")
        const newCart = await getCartByUserId(4);
        console.log("Results", newCart)

        console.log("Calling cart items")
        const newItems = await getCartItemsById(4);
        console.log("Results:", newItems)
    } catch (error) {
        console.log("Error during testDB");
        console.log(error);
    }
}

async function rebuildDB() {
    try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialBakery();
    await createInitialCandy();
    await createInitialCart();
    await createInitialCartItems();
    } catch (error) {
    console.log("Error during rebuildDB:")
    console.log(error.detail);
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());