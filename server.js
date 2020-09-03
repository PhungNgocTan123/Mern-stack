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

app.listen(5000, () => { console.log("Server started ") })