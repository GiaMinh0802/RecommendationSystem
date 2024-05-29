const express = require('express')
const router = express.Router()
const { getCart, addToCart, updateCart, removeCart, removeProductCart } = require('../controllers/cartController')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')

router.get('/', jwtMiddleware, getCart)
router.post('/', jwtMiddleware, addToCart)
router.put('/', jwtMiddleware, updateCart)
router.delete('/', jwtMiddleware, removeCart)
router.delete('/:idProd', jwtMiddleware, removeProductCart)

module.exports = router