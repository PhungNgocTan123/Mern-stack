const express = require('express');
const { products } = require('../data');
const Product = require('../models/Product');
// const getToken = require('../util');

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.post("/", async (req, res) => {
    const { title, location, countInstock, price, total, description, star } = req.body;
    const product = new Product({
        title,
        location,
        countInstock,
        price,
        total,
        description,
        star,
    });
    const newProduct = await product.save();
    console.log(newProduct)
    if (newProduct) {
        return res.status(201).send({ message: 'New product created', data: newProduct });
    }
    return res.status(500).send({ message: "Error is creating product" })
})

module.exports = router;