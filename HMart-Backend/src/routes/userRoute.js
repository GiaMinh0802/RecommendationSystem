const express = require('express')
const router = express.Router()
const {
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
} = require('../controllers/userController')

const { jwtMiddleware, isAdmin } = require('../middlewares/jwtMiddleware')

router.get('/', getUsers)
router.get('/:id', jwtMiddleware, getUserById)
router.put('/', jwtMiddleware, updateUser)
router.delete('/:id', jwtMiddleware, isAdmin, deleteUser)
router.post('/block/:id', jwtMiddleware, isAdmin, blockUser)
router.post('/unblock/:id', jwtMiddleware, isAdmin, unblockUser)

module.exports = router