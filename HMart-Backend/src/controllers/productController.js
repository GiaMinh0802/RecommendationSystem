const Product = require('../models/productModel')
const Category = require('../models/categoryModel')
const Brand = require('../models/brandModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const validateID = require('../utils/validate')
const axios = require('axios')

const getProductRecommenders = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateID(_id)
    try {
        const products_rec = await axios.get(`http://127.0.0.1:8888/recommender/${_id}`)
        const product_ids = products_rec.data['products']
        const productPromises = product_ids.map(async (product_id) => {
            const product = await Product.findById(product_id)
            return product
        })
        let products = await Promise.all(productPromises)
        res.json(products)
    } catch (error) {
        throw new Error(error)
    }
})

const getProducts = asyncHandler(async (req, res) => {
    try {
        let idCategory = ""
        if (req.query.category) {
            idCategory = await Category.findOne({ "title": req.query.category }).then(category => {
                return category._id.toString()
            })
            req.query.category = idCategory
        }
        let idBrand = ""
        if (req.query.brand) {
            idBrand = await Brand.findOne({ "title": req.query.brand }).then(brand => {
                return brand._id.toString()
            })
            req.query.brand = idBrand
        }
        // Filtering
        const queryObj = { ...req.query }
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach((el) => delete queryObj[el])
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        let query = Product.find(JSON.parse(queryStr))

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ")
            query = query.sort(sortBy)
        }

        // Limiting the fields
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ")
            query = query.select(fields)
        }

        // Pagination
        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if (req.query.page) {
            const productCount = await Product.countDocuments()
            if (skip >= productCount)
                throw new Error('This page does not exists')
        }

        const product = await query.populate('category brand colors')
        res.json(product)
    } catch (error) {
        throw new Error(error)
    }
})

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateID(id)
    try {
        const findProduct = await Product.findById(id).populate('category brand colors')
        res.json(findProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateID(id)
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updatedProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateID(id)
    try {
        await Product.findByIdAndDelete(id)
        res.json({ message: "Deleted product" })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    getProductRecommenders,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}