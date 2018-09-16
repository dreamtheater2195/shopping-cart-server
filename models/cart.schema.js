const mongoose = require('mongoose');

const CartItemSchemna = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    }
})

const schema = new mongoose.Schema({
    active: {
        type: Boolean,
        required: true
    },
    modifiedOn: { type: Date, required: true },
    products: [CartItemSchemna]
});

module.exports = schema;