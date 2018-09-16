const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    quantity: { type: Number, required: true },
    createdOn: { type: Date, required: true }
});

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imagePath: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    quantity: { type: Number, min: 0 },
    reservations: [ReservationSchema]
});

module.exports = mongoose.model('Product', schema);