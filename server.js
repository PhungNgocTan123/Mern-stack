require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const data = require('./data');
const config = require('config');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const userRoute = require('./routes/user');
const productRoute = require('./routes/product')

// Connect db
const db = config.get('mongoURI');
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ucreateIndexes: true,
})
    .then(() => console.log('Mongodb connected ...'))
    .catch(() => console.log(err))

// routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// app.get("/api/product/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x => x._id === productId);
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).json({ msg: "Product Not Found." })
//     }
// })
const port = process.env.PORT || 5000;

app.listen(5000, () => { console.log("Server started ") })