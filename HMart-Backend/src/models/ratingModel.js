const mongoose = require('mongoose')

var ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Rating', ratingSchema)