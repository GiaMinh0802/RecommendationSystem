const Cart = require('../models/cartModel')
const asyncHandler = require('express-async-handler')
const validateID = require('../utils/validate')

const getCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateID(_id)
    try {
        const getCart = await Cart.find({ "user": _id }).populate("carts.color carts.product")
        res.json(getCart[0].carts)
    } catch (error) {
        throw new Error(error)
    }
})

const addToCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { idProd, color, price, quantity } = req.body
    validateID(_id)
    validateID(idProd)
    try {
        let getCart = await Cart.findOne({ "user": _id })
        if (!getCart) {
            getCart = await Cart.create(
                {
                    "user": _id,
                    "carts": []
                }
            )
        }
        const alreadyAddedIndex = getCart.carts.findIndex(item => item.product.toString() === idProd)
        if (alreadyAddedIndex === -1) {
            getCart.carts.push({ product: idProd, color, price, quantity })
        } else {
            getCart.carts[alreadyAddedIndex].quantity = quantity
            getCart.carts[alreadyAddedIndex].color = color
        }
        getCart = await getCart.save()
        res.json(getCart)
    } catch (error) {
        throw new Error(error)
    }

})

const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { idProd, quantity } = req.body
    validateID(_id)
    validateID(idProd)
    try {
        let getCart = await Cart.findOne({ "user": _id })
        if (!getCart) {
            getCart = await Cart.create(
                {
                    "user": _id,
                    "carts": []
                }
            )
        }
        const alreadyAddedIndex = getCart.carts.findIndex(item => item.product.toString() === idProd)
        if (alreadyAddedIndex !== -1) {
            getCart.carts[alreadyAddedIndex].quantity = quantity
        } else {
            getCart.carts.push({ product: idProd, quantity: quantity })
        }
        await getCart.save()
        res.json(getCart)
    } catch (error) {
        throw new Error(error)
    }
})

const removeCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateID(_id)
    try {
        const updatedCart = await Cart.findOneAndUpdate({ "user": _id }, { $set: { "carts": [] } }, { new: true })
        res.json(updatedCart)
    } catch (error) {
        throw new Error(error)
    }
})

const removeProductCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { idProd } = req.params
    validateID(_id)
    validateID(idProd)
    try {
        let getCart = await Cart.findOne({ "user": _id })
        if (!getCart) {
            getCart = await Cart.create(
                {
                    "user": _id,
                    "carts": []
                }
            )
        }
        const alreadyAddedIndex = getCart.carts.findIndex(item => item.product.toString() === idProd)
        if (alreadyAddedIndex !== -1) {
            getCart.carts.splice(alreadyAddedIndex, 1)
        }
        await getCart.save()
        res.json(getCart)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    getCart,
    addToCart,
    updateCart,
    removeCart,
    removeProductCart
}