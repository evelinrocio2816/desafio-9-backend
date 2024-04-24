const express = require("express");
const router = express.Router(); 
const generateUsers = require("../services/faker.js");

router.get("/mocking", (req, res) => {
    //Generamos un array de users: 
    const products = [];

    for ( let i = 0; i < 100; i++ ){
        products.push(generateUsers());
    }
    res.json(products);
})

module.exports = router;