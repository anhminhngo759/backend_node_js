const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            trim: true
        },
        address: {
            type: String
        },
        role: {
            type: String,
            enum: ['user', 'admin'], // Giới hạn giá trị có thể là 'user' hoặc 'admin'
            default: 'user' // Mặc định là 'user'
        },
    },
    { timestamps: true } // createdAt, updatedAt
);
const User = mongoose.model('users', userSchema);

module.exports = User

