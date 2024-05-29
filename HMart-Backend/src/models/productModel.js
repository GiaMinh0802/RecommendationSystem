const mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
    colors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Color"
        }
    ],
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    totalRating: {
        type: Number,
        default: 0
    }
}, { versionKey: false })

module.exports = mongoose.model('Product', productSchema)