const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('category',categorySchema)