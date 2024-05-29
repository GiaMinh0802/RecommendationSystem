const mongoose = require('mongoose')

var wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    wishlist: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            
            }
        }
    ]
}, { versionKey: false })

module.exports = mongoose.model('Wishlist', wishlistSchema)