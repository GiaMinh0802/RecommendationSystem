const Rating = require('../models/ratingModel')
const asyncHandler = require('express-async-handler')
const validateID = require('../utils/validate')

const getRatingById = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateID(id)
    try {
        const ratings = await Rating.find({ 'product': id }).populate('user').sort({ createdAt: 1 })
        res.json(ratings)
    } catch (error) {
        throw new Error(error)
    }
})

const ratingProduct = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { idProd, star, comment } = req.body
    validateID(_id)
    validateID(idProd)
    try {
        let getRating = await Rating.findOne({ user: _id, product: idProd })
        if (getRating) {
            getRating.star = star
            getRating.comment = comment
        } else {
            getRating = new Rating({
                user: _id,
                product: idProd,
                star: star,
                comment: comment
            })
        }
        await getRating.save()
        getRating = await Rating.find({ user: _id})
        res.json(getRating)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { 
    getRatingById,
    ratingProduct
}