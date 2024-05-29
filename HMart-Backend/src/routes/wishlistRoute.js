const express = require('express')
const router = express.Router()
const { getWishlist, addToWishlist } = require('../controllers/wishlistController')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')

router.get('/', jwtMiddleware, getWishlist)
router.post('/', jwtMiddleware, addToWishlist)

module.exports = router