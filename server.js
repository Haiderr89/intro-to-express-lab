// Import Express
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

// Create an Express app
const app = express()


// Define routes here (we'll add them soon)

//========================================================================
//1. Be Polite, Greet the User

app.get('/greetings/:username', (req, res) => {
    res.send(`Hello there, ${req.params.username}`);
});

//========================================================================
//2. Rolling the Dice

app.get('/roll/:numberParam', (req, res) => {
    const number = req.params.numberParam;

    if (!isNaN(number) && number > 0) {
        const randomNumber = Math.floor(Math.random() * (number));
        res.send(`You rolled a ${randomNumber}`);

    }

    else {
        res.send('Invalid input');
    }
})

//========================================================================
//3. Rolling the Dice

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:indexParam', (req, res) => {

    if (req.params.indexParam > 2) {
        res.send('This item is not yet in stock. Check back soon!')
    }
    else {
        res.send(`So, you want the ${collectibles[req.params.indexParam].name}? For ${collectibles[req.params.indexParam].price}, it can be yours!`);
    }
})

//========================================================================
//4. Filter Shoes by Query Parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {

    const min = req.query.minPrice;
    const max = req.query.maxPrice;
    const shoeType = req.query.type;

    if (!min && !max && !shoeType) {
        return res.send(shoes);
    }

    const result = [];

    for (let i = 0; i < shoes.length; i++) {

        const shoe = shoes[i];
        if (shoe.price >= min) {
            result.push(shoe);
        }
        if (shoe.type === shoeType) {
            result.push(shoe);
        }
        if (shoe.price <= max) {
            result.push(shoe);
        }
        // else{
        //     res.send('Nothing Matches!');
        // }
    }
    res.send(result);
});


// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
})