const express = require('express');

const app = express();
const data = require('./data');

app.use(express.json());
app.get("/api/products", async (req, res) => {
    console.log(data.products)
    try {
        res.send(data.products);
    } catch (e) {
        console.log(e);
    }
})

app.get("/api/product/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId);
    if (product) {
        res.send(product);
    } else {
        res.status(404).json({ msg: "Product Not Found." })
    }
})
app.listen(5000, () => { console.log("Server started ") })