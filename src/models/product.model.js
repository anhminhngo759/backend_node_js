const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: [{
        type: String,
        required: true,
    }],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        min: 0
    },
    category_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category",
    }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('product', productSchema)