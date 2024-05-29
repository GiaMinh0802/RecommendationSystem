const express = require('express')
const router = express.Router()
const { getProductRecommenders, getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')
const { jwtMiddleware, isAdmin } = require('../middlewares/jwtMiddleware')

router.get('/recommenders', jwtMiddleware, getProductRecommenders)

router.get('/', getProducts)
router.get('/:id', getProductById)

router.post('/', jwtMiddleware, isAdmin, createProduct)
router.put('/:id', jwtMiddleware, isAdmin, updateProduct)
router.delete('/:id', jwtMiddleware, isAdmin, deleteProduct)

module.exports = router