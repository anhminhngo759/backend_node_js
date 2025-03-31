const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('category',categorySchema)