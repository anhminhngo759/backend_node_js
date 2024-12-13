const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // Lưu URL hoặc đường dẫn của hình ảnh
      trim: true,
    },
    product: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products'
      } // Liên kết với Product
    ],
  },
  { timestamps: true } // createdAt, updatedAt
);

const Category = mongoose.model('categories', categorySchema);
module.exports = Category;
