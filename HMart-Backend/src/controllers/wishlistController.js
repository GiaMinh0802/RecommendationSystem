const Wishlist = require('../models/wishlistModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateID = require('../utils/validate')

const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateID(_id)
    try {
        const getWishlist = await Wishlist.find({ "user": _id }).populate("wishlist.product")
        res.json(getWishlist[0].wishlist)
    } catch (error) {
        throw new Error(error)
    }
})

const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { idProd } = req.body
    validateID(_id)
    validateID(idProd)
    try {
        let getWishlist = await Wishlist.findOne({ "user": _id })
        if (!getWishlist) {
            getWishlist = await Wishlist.create(
                {
                    "user": _id,
                    "wishlist": []
                }
            )
        }
        const alreadyAddedIndex = getWishlist.wishlist.findIndex(item => item.product.toString() === idProd)
        if (alreadyAddedIndex !== -1) {
            getWishlist.wishlist.splice(alreadyAddedIndex, 1)
        } else {
            getWishlist.wishlist.push({ product: idProd })
        }
        getWishlist = await getWishlist.save()
        res.json(getWishlist.wishlist)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    getWishlist,
    addToWishlist
}