const express = require('express')
const router = express.Router()
const { getRatingById, ratingProduct } = require('../controllers/ratingController')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')

router.get('/:id', getRatingById)
router.post('/', jwtMiddleware, ratingProduct)

module.exports = router