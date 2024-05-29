const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')
const validateID = require('../utils/validate')
const moment = require('moment')

const getOrders = asyncHandler(async (req, res) => {
    try {
        let query = Order.find()
        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if (req.query.page) {
            const orderCount = await Order.countDocuments()
            if (skip >= orderCount)
                throw new Error('This page does not exists')
        }
        const order = await query.sort({ orderAt: -1 })
        res.json(order)
    } catch (error) {
        throw new Error(error)
    }
})

const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateID(id)
    try {
        const getOrder = await Order.findById(id).populate({
            path: 'orderItems.product',
            populate: {
                path: 'brand',
                model: 'Brand'
            }
        })
        res.json(getOrder)
    } catch (error) {
        throw new Error(error)
    }
})

const getOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateID(_id)
    try {
        const getOrder = await Order.find({ "user": _id }).populate('orderItems.product orderItems.color').sort({ orderAt: -1 })
        res.json(getOrder)
    } catch (error) {
        throw new Error(error)
    }
})

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { orderItems, shippingInfo, totalPrice, typePayment } = req.body
    validateID(_id)
    try {
        const order = await Order.create({ user: _id, orderItems, shippingInfo, totalPrice, typePayment })
        res.json(order)
    } catch (error) {
        throw new Error(error)
    }
})

const updateStatusOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { idOrder, status } = req.body
    validateID(_id)
    validateID(idOrder)
    try {
        let getOrder = await Order.findOne({ "user": _id, "_id": idOrder })
        if (getOrder) {
            getOrder.status = status
            getOrder = await getOrder.save()
            res.json(getOrder)
        }
        res.json([])
    } catch (error) {
        throw new Error(error)
    }
})

const createPayment = asyncHandler(async (req, res) => {

    let date = new Date()
    let createDate = moment(date).format('YYYYMMDDHHmmss')

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress

    let tmnCode = process.env.vnp_TmnCode
    let secretKey = process.env.vnp_HashSecret
    let vnpUrl = process.env.vnp_Url
    let returnUrl = process.env.vnp_ReturnUrl
    let orderId = moment(date).format('DDHHmmss')
    let amount = req.body.amount
    let bankCode = req.body.bankCode

    let locale = req.body.language
    if (locale === null || locale === '') {
        locale = 'vn'
    }
    let currCode = 'VND'
    let vnp_Params = {}
    vnp_Params['vnp_Version'] = '2.1.0'
    vnp_Params['vnp_Command'] = 'pay'
    vnp_Params['vnp_TmnCode'] = tmnCode
    vnp_Params['vnp_Locale'] = locale
    vnp_Params['vnp_CurrCode'] = currCode
    vnp_Params['vnp_TxnRef'] = orderId
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId
    vnp_Params['vnp_OrderType'] = 'other'
    vnp_Params['vnp_Amount'] = amount * 100
    vnp_Params['vnp_ReturnUrl'] = returnUrl
    vnp_Params['vnp_IpAddr'] = ipAddr
    vnp_Params['vnp_CreateDate'] = createDate
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode
    }

    vnp_Params = sortObject(vnp_Params)

    let querystring = require('qs')
    let signData = querystring.stringify(vnp_Params, { encode: false })
    let crypto = require("crypto")
    let hmac = crypto.createHmac("sha512", secretKey)
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex")
    vnp_Params['vnp_SecureHash'] = signed
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })

    res.json({ url: vnpUrl })
})

const returnPayment = asyncHandler(async (req, res) => {
    let vnp_Params = req.query

    let secureHash = vnp_Params['vnp_SecureHash']

    delete vnp_Params['vnp_SecureHash']
    delete vnp_Params['vnp_SecureHashType']

    vnp_Params = sortObject(vnp_Params)

    let tmnCode = process.env.vnp_TmnCode
    let secretKey = process.env.vnp_HashSecret

    let querystring = require('qs')
    let signData = querystring.stringify(vnp_Params, { encode: false })
    let crypto = require("crypto")
    let hmac = crypto.createHmac("sha512", secretKey)
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex")

    if (secureHash === signed) {
        res.json({ code: vnp_Params['vnp_ResponseCode'] })
    } else {
        res.json({ code: '97' })
    }
})

const statisticOrder = asyncHandler(async (req, res) => {
    try {
        const currentYear = new Date().getFullYear()
        const statisticCurrentYear = await getStatistic(currentYear)
        const statisticLastYear = await getStatistic(currentYear - 1)

        const percentRevenue = Math.round(((statisticCurrentYear['totalRevenue'] - statisticLastYear['totalRevenue']) / statisticLastYear['totalRevenue'] * 100))
        const percentOrder = Math.round(((statisticCurrentYear['numberOrder'] - statisticLastYear['numberOrder']) / statisticLastYear['numberOrder'] * 100))
        const percentProduct = Math.round(((statisticCurrentYear['totalProduct'] - statisticLastYear['totalProduct']) / statisticLastYear['totalProduct'] * 100))

        statisticCurrentYear['percentRevenue'] = percentRevenue
        statisticCurrentYear['percentOrder'] = percentOrder
        statisticCurrentYear['percentProduct'] = percentProduct

        res.json(statisticCurrentYear)
    } catch (error) {
        throw new Error(error);
    }
});

async function getStatistic(year) {
    const currentYear = year
    const startOfYear = new Date(currentYear, 0, 1)
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59)

    const orders = await Order.find({
        orderAt: {
            $gte: startOfYear,
            $lte: endOfYear
        }
    }).sort({ orderAt: -1 })

    let revenueByMonth = Array(12).fill(0)

    orders.forEach(order => {
        const month = order.orderAt.getMonth()
        const total = order.totalPrice
        revenueByMonth[month] += total
    })

    const recentOrders = orders.slice(0, 10).map(order => {
        return {
            totalPrice: order.totalPrice,
            numberProduct: order.orderItems.length,
            orderAt: order.orderAt,
            status: order.status
        }
    })

    const totalProduct = orders.reduce((a, b) => a + b.orderItems.length, 0)

    const totalRevenue = revenueByMonth.reduce((a, b) => a + b, 0)

    const numberOrder = orders.length

    return { totalRevenue, numberOrder, totalProduct, revenueByMonth, recentOrders }
}

function sortObject(obj) {
    let sorted = {}
    let str = []
    let key
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key))
        }
    }
    str.sort()
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+")
    }
    return sorted
}

module.exports = {
    getOrders,
    getOrderById,
    getOrder,
    createOrder,
    updateStatusOrder,
    createPayment,
    returnPayment,
    statisticOrder
}