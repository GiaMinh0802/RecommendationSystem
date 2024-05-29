const mongoose = require('mongoose')

var orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            color: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Color",
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    shippingInfo: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        ward: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "Processing",
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    typePayment: {
        type: String,
        enum: ['COD', 'VNPAYQR', 'VNBANK', 'INTCARD'],
        required: true
    },
}, { versionKey: false })

module.exports = mongoose.model('Order', orderSchema)