const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateID = require('../utils/validate')

const getUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateID(id)
    try {
        const getUser = await User.findById(id)
        res.json(getUser)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateID(id)
    try {
        await User.findByIdAndDelete(id)
        res.json({ message: "Deleted user" })
    } catch (error) {
        throw new Error(error)
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateID(_id)
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            mobile: req?.body?.mobile
        },
            {
                new: true
            })
        res.json(updatedUser)
    } catch (error) {
        throw new Error(error)
    }
})

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateID(id)
    try {
        await User.findByIdAndUpdate(id, {
            isBlocked: true
        },
            {
                new: true
            })
        res.json({ message: "Block user" })
    } catch (error) {
        throw new Error(error)
    }
})

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateID(id)
    try {
        await User.findByIdAndUpdate(id, {
            isBlocked: false
        },
            {
                new: true
            })
        res.json({ message: "Unblock user" })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser
}