const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories', // Tham chiếu tới bảng Category
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        images: {
            type: Array, // Lưu URL hoặc đường dẫn của hình ảnh
            required: true
        },
        description: {
            type: String,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            // required: true,
            default: 0, // Số lượng trong kho
        },
        sold_quantity: {
            type: Number,
            default: 0, // Số lượng đã bán
        },
    },
    {
        timestamps: true, // Bật `created_at` và `updated_at`
    }
);

const Product = mongoose.model('products', productSchema);
module.exports = Product;
