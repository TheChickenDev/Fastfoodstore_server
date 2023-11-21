const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: false, default: '' },
    type: { type: String, required: false, default: '' },
    price: { type: Number, required: true },
    img: {
        type: String,
        required: false,
        default: '',
    },
    imgID: {
        type: String,
        required: false,
        default: '',
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
