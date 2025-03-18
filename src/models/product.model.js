const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category",
    }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('product',productSchema)