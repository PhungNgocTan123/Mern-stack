const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
        default: false,
    },
    countInstock: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        default: true,
    },
    star: {
        type: Number,
        default: 0,
        required: true,
    },
    numReviews: {
        type: String,
        default: 0,
    }
});


module.exports = mongoose.model('Product', productSchema)