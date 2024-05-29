const express = require('express')
const router = express.Router()
const { getOrders, getOrderById, getOrder, createOrder, updateStatusOrder, createPayment, returnPayment, statisticOrder } = require('../controllers/orderController')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')

router.get('/statistic', statisticOrder)

router.get('/all', getOrders)
router.get('/:id', getOrderById)

router.get('/', jwtMiddleware, getOrder)
router.post('/', jwtMiddleware, createOrder)
router.put('/', jwtMiddleware, updateStatusOrder)

router.post('/create_payment_url', createPayment)
router.get('/vnpay_return', returnPayment)

module.exports = router