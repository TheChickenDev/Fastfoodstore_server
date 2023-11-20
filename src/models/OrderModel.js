const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    date: { type: Date, required: true },
    products: [
        {
            productId: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: false,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
