// Step 1: Import Client & Exports
const { create } = require('domain');
const { client } = require('./index')
const { createUser, getAllUsers } = require('./Users')
const { updateCart, createCart, getCartByUserId } = require('./Cart');
const { createCartItem, getCartItemsById } = require('./CartItems')
const { createSweetProduct, getAllSweetProducts} = require('./SweetProducts');
const { createDepartment, getAllDepartments } = require('./Department');
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
            DROP TABLE IF EXISTS sweet_products;
            DROP TABLE IF EXISTS department;
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
        CREATE TABLE department(
            "departmentId" SERIAL PRIMARY KEY,
            "departmentName" VARCHAR(255) UNIQUE NOT NULL
        );
        CREATE TABLE sweet_products(
            "sweetsId" SERIAL PRIMARY KEY,
            "sweetsName" VARCHAR(255) UNIQUE NOT NULL,
            stock INTEGER,
            price NUMERIC,
            "departmentId" INTEGER REFERENCES department("departmentId"),
            description TEXT NOT NULL,
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
            "sweetsId" INTEGER REFERENCES sweet_products("sweetsId"),
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
async function createInitialDepartments() {
    console.log("creating departments")
    try {
        await createDepartment({
            departmentId: 1,
            departmentName: "Baked Goods"
        });
        await createDepartment({
            departmentId: 2,
            departmentName: "Candy"
        });
        console.log("finished creating departments")
    } catch (error) {
        
    }
}
async function createInitialSweetProducts() {
    console.log("creating Initial sweets products")
    try {
        await createSweetProduct({
            sweetsName: 'Red Velvet Cake',
            stock:'4000',
            price:'30.00',
            description: 'Scarlet-colored chocolate layer cake. Layered with ermine icing',
            image:"https://houseofnasheats.com/wp-content/uploads/2019/01/Best-Homemade-Red-Velvet-Cake-Recipe-1.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Pumpkin Pie',
            stock:'4000',
            price:'40.00',
            description: 'This festive favorite that is a treat for everyone, any time of the year!',
            image:"https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-11/Classic-Pumpkin-Pie_1288.jpg?itok=E0whgTM5",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Oreo Pie',
            stock:'4000',
            price:'40.00',
            description: 'This cool, creamy, easy Oreo pie is a delicious homemade no-bake dessert that will surely be a favorite with Oreo lovers!',
            image:"https://thedashleyskitchen.com/wp-content/uploads/2021/11/Inside-Slice-Decorated-Oreo-Pie-720x720.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: "Reese's Peanut Butter Pie",
            stock:'4000',
            price:'40.00',
            description: "Who doesn't love chocolate and peanut butter? This irresistible Reeses Peanut Butter Pie has a bottom layer of fudge topped with creamy peanut butter filling studded with peanut butter cups. Try this peanut butter cup pie next time you're in need of a decadent dessert that turns heads",
            image:"https://www.allrecipes.com/thmb/tp2KdvR4oZv1AMuaUSq0qlCeYVo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/190359-peanut-butter-pie-Melissa-Goff-1x1-1-269e30588a7742b5a0046572e713ae1d.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Cherry Pie',
            stock:'4000',
            price:'25.00',
            description: 'Our baked cherry pies are made with the freshest cherries daily. Enjoy this delicacy after a meal, or during an event!',
            image:"https://images-gmi-pmc.edge-generalmills.com/a564f33d-0d34-46d2-9ecb-2a8fb9b0b391.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Sweetest Pecan Pie',
            stock:'4000',
            price:'25.00',
            description: 'This is a wonderfully rich, southern pecan pie that will have your whole family smiling and wanting more!',
            image:"https://images-gmi-pmc.edge-generalmills.com/2b31966f-9558-490a-b82b-c2018b288425.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Dutch Apple Pie',
            stock:'4000',
            price:'25.00',
            description: "America's favorite pie, made with a crumbly topping, and fresh granny-smith apples!",
            image:"https://res.cloudinary.com/hksqkdlah/image/upload/SFS_Dutch_Apple_Pie_419_ngrlq2.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Banana Cream Pie',
            stock:'4000',
            price:'25.00',
            description: "Satisfy your sweet tooth with this delicatable, homemade banana cream pie! It is irresisitibly sweet with a velvety smooth texture, you'll wish you bought more than one!",
            image:"https://www.spoonforkbacon.com/wp-content/uploads/2022/03/banana-cream-pie-recipe-card-500x500.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Classic Key Lime Pie',
            stock:'4000',
            price:'25.00',
            description: 'This sweet and tart Key Lime Pie is made with fresh Key Limes and topped with whipped cream!',
            image:"https://www.livewellbakeoften.com/wp-content/uploads/2021/05/Key-Lime-Pie-NEW-7s.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'French Silk Pie',
            stock:'4000',
            price:'40.00',
            description: 'This creamy and indulgent pie combines flaky pie crust, smooth-as-silk chocolate filling, and fresh whipped cream on top. For the sweetest tooth, this will be more than satisfying!',
            image:"https://joyfoodsunshine.com/wp-content/uploads/2020/02/homemade-french-silk-pie-recipe-2.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Hershey Sundae Pie',
            stock:'4000',
            price:'30.00',
            description: "A crunchy chocolate crust filled with chocolate crème filling and garnished with real HERSHEY'S® Chocolate Chips",
            image:"https://i.pinimg.com/originals/22/69/a3/2269a32b5b02004e81a89b711955beff.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'White Chocolate Macadamia Nut Cookies',
            stock:'4000',
            price:'25.00',
            description: "These white chocolate macadamia nut cookies are soft-baked style with extra chewy centers. They're absolutely PACKED with white chocolate and salted macadamia nuts. Pack of 20!",
            image:"https://inbloombakery.com/wp-content/uploads/2022/04/featured-image-White-Chocolate-Macadamia-Nut-Cookies.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: "M&M Mini's Cookies",
            stock:'4000',
            price:'20.00',
            description: 'These delicious M&M Cookies have chewy edges, soft centers, and they are packed with M&M Minis and chocolate chips! Pack of 20!',
            image:"https://butternutbakeryblog.com/wp-content/uploads/2021/10/best-mm-cookies.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Classic Peanut Butter Blossom Cookies',
            stock:'4000',
            price:'30.00',
            description: "Tender peanut butter cookies, made from scratch in a recipe that comes together quickly, are the base that sets the standard. Once they're out of the oven, Hershey's Kisses are immediately pressed into the warm cookies so that the dough cradles the candy and holds it in place. Once they're cooled and ready to eat, they're the perfect combination of silky chocolate and tender, sweet-salty peanut butter cookie—and you'd better believe they'll disappear fast! Pack of 20!",
            image:"https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipemediafiles/recipes/retail/x17/2018_peanut-blossom-cookies_5287_760x580.jpg?ext=.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Chocolate Hazelnut Thumbprint Cookies',
            stock:'4000',
            price:'25.00',
            description: 'Choco-holics, beware! These chocolate hazelnut thumbprint cookies have chocolate cookie dough rolled in hazelnuts and topped with chocolate hazelnut spread. Pack of 20!',
            image:"https://www.spendwithpennies.com/wp-content/uploads/2017/07/chocolate-hazelnut-thumbprint-cookies-2-500x375.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Rose Cupcakes',
            description: 'Made with puff pastry, sliced apples, and apricot jam.',
            stock:'2344',
            price:'20.00',
            image: "https://i.pinimg.com/originals/a4/ae/0f/a4ae0f0e91135543d4754284689a704d.jpg",
            departmentId: 1
        });
        await createSweetProduct({
            sweetsName: 'Orange-almond cake',
            description: "A cake that is gluten-free, being a mixture of eggs, ground almonds, cooked, oranges, and sugar.",
            stock:'1209',
            price:'32.00',
            image:"https://bakeplaysmile.com/wp-content/uploads/2022/07/Orange-Almond-Cake-1-4-2.jpg",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName: 'Braided Easter bread',
            description:'A braided yeast bread that goes amazing if you full it with pudding,poppyseeds, chocolate, or nuts.',
            stock:'90',
            price:'10',
            image:"https://images.eatsmarter.com/sites/default/files/styles/1600x1200/public/braided-bread-easter-basket-611748.jpg",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'Irish Coffee Macarons',
            description:'Delicious homemade coffee macarons',
            stock:'3023',
            price:'6.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2Fvj95oS29_z7wbBzlRTju6irsEL8%3D%2F864x648%2Fimages.kitchenstories.io%2FrecipeImages%2FBaileys_Macarons_1x1.jpg&w=1440&q=90",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'Flourless Peanut Butter Chocolate Chip Cookies',
            description:'A gluten free delicious crispy, chocolatey peanunt butter cookies with coconunt sugar instead of brown sugar which adds a fine caramel flavor',
            stock:'1500',
            price:'5.00',
            image:"https://wildwildwhisk.com/wp-content/uploads/2018/12/Peanut-Butter-Chocolate-Chip-Cookies-3.jpg",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'Simple Lemon Poppy Seed Muffins',
            description:'The batter is very quickly prepared, mixed with poppy seeds, which makes anamazing flavour that tastes exactly like lemon cake!',
            stock:'455',
            price:'3.50',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2FaZ7qQu4ExdysBl5TgRyUAaK3NH0%3D%2F768x576%2Fimages.kitchenstories.io%2FrecipeImages%2F11_06_SimpleLemonPoppySeedMuffins_titlePicture.jpg&w=1440&q=85",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'American Apple Pie',
            description:'The juicy fruit filling is spiced with nutmeg, cinnamon, and lemon juice!',
            stock:'545',
            price:'20.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2F25kjJGzBX_LKxy1SxzjXKiCsclA%3D%2F864x648%2Fimages.kitchenstories.io%2FrecipeImages%2F04_25_AmericanApplePie_final.jpg&w=768&q=90",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'Classic German CheeseCake',
            description:'A delicious classic german cheesecake that uses quark in the filling and leaves you wanting more!',
            stock:'600',
            price:'40.00',
            image:"https://mydinner.co.uk/wp-content/uploads/2021/05/German-Cheesecake1.jpg",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'Flourless Chocolate Cake',
            description:'Have you ever wanted a chocolate cake but without the flour, and the taste iseven better, well this is the one for you, this cake well taste like a dream come true!',
            stock:'345',
            price:'30.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2FkXRoSzJVejQjtG1mI8RaIrJuvyI%3D%2F864x648%2Fimages.kitchenstories.io%2FrecipeImages%2FChocolateCake_Final.jpg&w=1440&q=90",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'Marbled Coffee Cake',
            description:'I think we can agree that coffee is a very desired flavor that most enjoy, well thismarbled coffee cake is a very creamy delicious texture in the inside with a nice harded texture in the outside!',
            stock:'23',
            price:'45.00',
            image:"https://images-gmi-pmc.edge-generalmills.com/e2d723ab-8502-48b3-afb7-3b0031c92304.jpg",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'Chewy Chocolate Chip Cookies',
            description:'Do you enjoy a classic chocolate chip cookie, well this chewy one I am sure will leave you wanting more after santa is done with them.',
            stock:'5000',
            price:'4.00',
            image:"https://www.modernhoney.com/wp-content/uploads/2017/11/Thin-and-Crispy-Chocolate-Chip-Cookies-2.jpg",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'Fudy Brownies',
            description:'Do you like biting into a dessert and its just go smooth and flavorful to bite on, this fudy brownie well be perfect for those who enjoy a flavourful dessert, that comes in a box of 10!',
            stock:'2317',
            price:'20.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2FXDPmqs47Jynh1X68YmMWNEegToo%3D%2F768x576%2Fimages.kitchenstories.io%2FrecipeImages%2FRP16_02_18_4x3.jpg&w=1440&q=85",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'Blueberry Muffins',
            description:'A classic muffin that never gets old, ours come in a pack of 12 and is freshly baked!',
            stock:'356',
            price:'15.00',
            image:"https://www.kitchenstories.com/_next/image?url=https%3A%2F%2Fimages.services.kitchenstories.io%2F8UM5wRKIQ8MeG83iTDpmg2RWDQA%3D%2F768x576%2Fimages.kitchenstories.io%2FrecipeImages%2F06_09_KinderleichteBlaubeertoertchen_titlePicture.jpg&w=1440&q=85",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'Flan',
            description:'A popular dessert in latin American countries, and for a good reason but this dessert will make you finish it in one sitting.',
            stock:'245',
            price:'30.00',
            image:"https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Creamy-Caramel-Flan_EXPS_FT20_2197_F_0723_1.jpg",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName:'Sticky Ginger Pudding',
            description:"You can never beat a pudding, unless it's spiced with ginger. And, don't forget the cream.",
            stock:'999',
            price:'10.00',
            image:"https://img.delicious.com.au/52dOVkJx/del/2020/06/sticky-ginger-pudding-133537-2.jpg",
            departmentId: 1
            });
        await createSweetProduct({
            sweetsName: 'Air Heads',
            description: 'Air Heads are a tangy, taff-like, chewy candy coming in a complete assortment of flavors. You might even find some special edition flavors for the holidays.',
            stock: 1000,
            price: 1.35,
            image: "https://i5.walmartimages.com/asr/99ba3cd5-0621-4609-b992-f544f2a8fb3c_1.20291b7fdacd346a80e4000e0fc93a0f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Air Heads Mini Bars',
            description: 'Air Heads are a tangy, taff-like, chewy candy coming in a complete assortment of flavors, but our mini bars  You might even find some special edition flavors for the holidays.',
            stock: 1000,
            price: .99,
            image: "https://cdn.media.amplience.net/i/partycity/469716?$large$&fmt=auto&qlt=default",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Bazooka Bubble Gum',
            description: 'Unwrap the festive fun this holiday season with Bazookas iconic pink chewy bubble gum in bulk.',
            stock: 1000,
            price: .99,
            image: "https://m.media-amazon.com/images/I/81e0p8CDXKL._SL1500_.jpg",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Black Cow',
            description: 'The new BlackCow is very different than the original.  Holloway, who also made the Slo Poke, introduced Black Cows in the late 1920s.  They were basically a Slo Poke dipped in a chocolate flavored covering, but this time we have added caramel',
            stock: 1000,
            price: 1.89,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/black-cow-candy-bar_3c45ba34-885a-4348-bb52-d0876967ab53.jpg?v=1664971873",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Bubble Tape Original Flavor',
            description: "Bubble Tape gum was the coolest gum.  Its so cool that you can buy gum in a container and dispense it like time.  Who wouldn't love it?.",
            stock: 1000,
            price: 1.99,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/bubble_tape_hubba_bubba_984c5259-d99a-4f17-b7e6-e70fb47728f7.jpg?v=1664971989",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Gummi Hot Dogs',
            description: 'Gummi Hot Dogs, a miniature version of the all American food.  The hot dog is 1.75 inches long and individually wrapped',
            stock: 1000,
            price: .33,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/gummi-hot-dogs_1_1_fa0ceba1-9835-4cdd-818e-1bb674b883f9.jpg?v=1664973035",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Gummi Mini Burgers',
            description: 'Gummi Mini Burgers, a miniature version of the all American food.  The burger is almost 1 inch in diameter and individually wrapped.',
            stock: 1000,
            price: .39,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/gummi-mini-burger3_069497f7-8b88-4781-9439-eb71f3570d48.jpg?v=1665069799&width=1100"
        });
        await createSweetProduct({
            sweetsName: 'Toxic Waste 3 OZ Halloween Bank',
            description: 'This Hazardously Sour Candy will bring back memories of contest in the school yard.  Who can keep it in their mouth for the longest?  Each 5 inch tall drum contains free stickers and about 30 pieces..',
            stock: 1000,
            price: 4.99,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/toxic-waiste-halloween-bank_ef49cb93-b3a7-4795-a965-442aa42f134b.jpg?v=1664976571&width=1100",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Wonder Ball Space Jam 0.88 Oz',
            description: "The Wonder Ball has returned!  Now with candy basketballs inside the chocolate ball and a separate bounce ball.  Each Wonder Ball will include 1 of 17 random bounce balls and mango flavored sweetart basketball candy.  There are 17 different possibilities for which character bounce ball you will receive.  Each Wonder Ball is about 2 inches in diameter.",
            stock: 1000,
            price: 2.99,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/wonder-balls2_d7e013b2-aa48-4981-a8d9-566476faa780.jpg?v=1664976762&width=1100",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Tangy Tarts - Bulk',
            description: 'Tangy Tarts will satisfy your hunger for tangy without being too sour.  TThey are sweet tart style candies about ½ inch in diameter',
            stock: 1000,
            price: 19.99,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/tangy-tarts-bulk-candy_2_e774f765-a9a6-4432-ba20-f7c234894dc8.jpg?v=1664976503",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Sneaky Stardust',
            description: 'This shape-shifting gum changes from powder to gum!  Sneaky Stardust is a remake of the 90s favorite, Bubble Jug.  The gum is in 3 assorted flavors; Sour Blue Raspberry, Sour Strawberry, and Sour Green Apple.',
            stock: 1000,
            price: 1.99,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/sneaky-stardust5_f3a66254-b0e1-4f2a-bf18-30421ebbdcf3.jpg?v=1664976201",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Abba Zaba',
            description: 'An Abba Zaba is a chewy taffy bar filled with a rich creamy peanut butter center.',
            stock: 1000,
            price: 1.69,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/abba-zaba3_d9d0282d-d383-4f84-95f8-c666e9d5a723.jpg?v=1664971581&width=1100",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Barrel of Monkeys',
            description: "What's more fun than a Barrel of Monkeys?  Each unit includes a barrel with playing instructions and 15 red monkeys.  The barrel is approximately 4.75 inches tall",
            stock: 1000,
            price: 8.99,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/barrel-of-monkeys_138435c4-16d3-4969-b051-26f1bf73d6ad.jpg?v=1664971723&width=1100",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Big Hunk',
            description: 'Big Hunk Almond is a long-lasting mouthful of chewy, honey-sweetened nougat filled with whole roasted Almonds',
            stock: 1000,
            price: 1.49,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/big-hunk3_a3f87b83-d60f-4d27-8ba1-1942bc1d789a.jpg?v=1664971794&width=1100",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: "Cella's Chocolate Covered Cherries",
            description: "Cella's Dark  Chocolate Cherries are 1.25 inches in diameter.  Selected  cherries are surrounded by a delicious 100% clear liquid then encased in real dark chocolate.  Individually wrapped.  Each 3 oz package contains 6 cherries.",
            stock: 1000,
            price: 3.99,
            image: "https://cdn.shopify.com/s/files/1/0004/8132/9204/products/cellas-cherries_cc2d2dcb-8e7a-4074-98f1-7c2dbea83107.jpg?v=1664972233&width=1100",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Runtz',
            description: "Hard fruit shaped candy with vibrant colors, artificially flavored. Great for satisfying a jaw breaker need without the jaw breaker habit. The longer they remain in your mouth, the easier it will be to bite down. If swallowed whole, these runtz will go down easy.",
            stock: 1000,
            price: 5.25,
            image: "https://cdn11.bigcommerce.com/s-xun5w23utl/images/stencil/1280x1280/products/642/1355/runts_vending_candy__47625.1607811331.jpg?c=1",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Mike and Ike',
            description: "Chewy, and fruity candy capsules that melt as you chew. If you desire a mouth full of fruity goodness, then Mike and Ike has you covered. With 5 flavors to choose from in the original Mike and Ike box, your mouth won't stop experiencing these delightful treats.",
            stock: 1000,
            price: 5.35,
            image: "https://www.candywarehouse.com/item-images/126098-01_mike-ike-candy-5-ounce-packs-12-piece-box.jpg",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Sweet Tarts',
            description: "Round and crunchy with a slight sour kick. These small pastel colored disks give your jaw a slight tingle. Bite down and hear the crunch while smaller pieces overlay your tongue in tart goodness.",
            stock: 1000,
            price: 5.23,
            image: "https://m.media-amazon.com/images/I/51mc0QM35RL.jpg",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Nerds',
            description: "Confetti of small, hard, colorful crumbs that quickly envelop yourtaste buds. These little guys pack quite the punch. Grab a handful and toss them in,you won't soon forget the power they bring.",
            stock: 1000,
            price: 3.45,
            image: "https://m.media-amazon.com/images/I/71nBM1T+8QL.jpg",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'War Heads',
            description: "Call the military because this hard candy will cause your taste buds to go to WAR. Coated with a harsh acidic sour powder that will alter your cheeks and mouth. After the first introduction, it will follow a soothing sweet calm. Then, take no shame, and bite down, this will bring the ultimate victory.",
            stock: 1000,
            price: 4.89,
            image: "https://cdn11.bigcommerce.com/s-1b75a/images/stencil/1280x1280/products/285/1935/DSCN0651__38631.1646360242.JPG?c=2",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: "Hersheys Milk Chocolate Bar",
            description: "12 pips of deliciously creamy milk chocolate. Enlighten yourself with the soothing comfort of carefully crafted chocolate. Give yourself to the inevitable melt as you bite in. Lose yourself in comfort.",
            stock: 1000,
            price: 2.63,
            image: "https://www.candywarehouse.com/item-images/125892-01_hersheys-milk-chocolate-bars-36-piece-box.jpg",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Jaw Breaker',
            description: "DO NOT BITE!, unless of course you want to break your jaw. You will never reach the middle but you won't want to give up. As you lick, you'll discover new layers of this candy galaxy. It's okay to quit, no one completes this mission. If you're the first, then get another.",
            stock: 1000,
            price: 1.99,
            image: "https://m.media-amazon.com/images/I/61n1xzmC66L.jpg",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Caramel Hard Candies',
            description: "Sweet rock hard caramel. Best to keep your mouth entertained for 3-5 minutes. Rich flavor of melted brown sugar, infused with vanilla extra, and corn syrup. Cooled till stiff for your pleasure. Grandmas love them and so will you.",
            stock: 1000,
            price: 4.75,
            image: "https://m.media-amazon.com/images/I/51KGOIVwNhL.jpg",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'DOTS',
            description: "Colorful, chewy thimbles that grip your teeth in a sticky mess. But no matter the mess, you'll be popping these DOTS till there are none left. Give them a nice squeeze before you toss one inside your mouth, you must ensure they have a certain bounce.",
            stock: 1000,
            price: 3.85,
            image: "https://cdn11.bigcommerce.com/s-nkdwo8ulw8/images/stencil/1280x1280/products/7592/11368/DOTS_Gumdrops__67096.1580496501.jpg?c=2",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Swedish Fish',
            description: "Red fish that don't just swim. The grant a soothing tart flavor as you chew. Don't let the red fool you into thinking they are up to no good. The fish will bring happiness to any consumer. Chew carefully though, they might grab hold of your molars.",
            stock: 1000,
            price: 4.69,
            image: "https://images.heb.com/is/image/HEBGrocery/001274914",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Milk Duds',
            description: "Round bite side balls of milk chocolate and caramel that you canchew like a gummy? Yes, Milk Duds does just that. Warning though, they may be difficult to retrieve from the box, and eye witnesses state that they grab hold of your smile. Thank goodness for fingers, now you can make sure those duds don't linger.",
            stock: 1000,
            price: 3.75,
            image: "https://m.media-amazon.com/images/I/41ekgxE5bhL.jpg",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Hubba Bubba Max: Strawberry Watermelon',
            description: "These cubes of green with red in the center are packed full of extreme strawberry watermelon flavor. You'll enjoy this gum for 10 minutes withouta doubt. Once the clock strike are another cube and experience it all over again. Blowing bubbles is not an issue with this brand.",
            stock: 1000,
            price: 1.35,
            image: "https://d2aam04nmhpdf8.cloudfront.net/images/images/000/028/561/xlarge/12854_01.jpg?1557855537",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Trolli: Sour Bite Crawlers',
            description: "Dewing colored worms coated in citric acid. Grab a bite are stretched it out to rip the worm in two. Or stuff the multiple colored worm all in yourmouth.",
            stock: 1000,
            price: 3.65,
            image: "https://m.media-amazon.com/images/I/91Kad-jepLL.jpg",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Chewy Spree',
            description: "5 colored discs pack full of 5 different fruity flavors. The more you chew the sour they seem to get. Be careful when you swallow though, make sure it's fully chewed, otherwise it may hurt. But these powerful discs will keep you coming back.",
            stock: 1000,
            price: 4.50,
            image: "https://mwdsnacks.com/wp-content/uploads/2020/04/527935.jpg",
            departmentId: 2
        });
        await createSweetProduct({
            sweetsName: 'Rainbow Lolipop',
            description: "Handmade hard candy wrapped into a lovely lollipop. Bright colors twisted together with a sweet rainbow flavor. Don't be surprise when it turns white, the color won't stay but the taste never fades.",
            stock: 1000,
            price: 0.99,
            image: "https://www.rebeccas.com/mm5/graphics/00000001/cn134.jpg",
            departmentId: 2
        });
        console.log("finished creating sweet products")
    } catch (error) {
        console.error(error)
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
            usersId: 1,
            active: true          
        });
        await createCart({
            usersId: 2,
            active: true            
        });
        await createCart({ 
            usersId: 3,
            active: true          
        });
        await createCart({
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
            sweetsId: 55,
            price_bought_at: 5.00
        });
        await createCartItem({
            cartId: 2,
            sweeetsId: 45,
            price_bought_at: 5.00
        });
        await createCartItem({
            cartId: 3,
            sweetsId: 20,
            price_bought_at: 5.00
        });
        // extra 4
        await createCartItem({
            cartId: 1,
            sweetsId: 23,
            price_bought_at: 5.00
        });
        // 5
        await createCartItem({
            cartId: 2,
            sweetsId: 21,
            price_bought_at: 5.00
        });
        // 6
        await createCartItem({
            cartId: 3,
            sweetsId: 25,
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
        
        console.log("calling all sweet products")
        const sweets = await getAllSweetProducts();
        console.log("results", sweets)

        console.log("calling all departments")
        const departments = await getAllDepartments();
        console.log("results", departments)

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
    console.log("running DB function")
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialDepartments();
    await createInitialSweetProducts();
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