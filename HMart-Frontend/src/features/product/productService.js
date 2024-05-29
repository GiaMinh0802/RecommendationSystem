import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

const getProducts = async (data) => {
    const response = await axios.get(`${base_url}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${data?.category ? `category=${data?.category}&&` : ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}${data?.page ? `page=${data?.page}&&` : ""}${data?.limit ? `limit=${data?.limit}&&` : ""}${data?.fields ? `fields=${data?.fields}&&` : ""}`)
    if (response.data) {
        return response.data
    }
}

const getProduct = async (idProd) => {
    const response = await axios.get(`${base_url}product/${idProd}`)
    if (response.data) {
        return response.data
    }
}

const getProductsForRecommenders = async () => {
    const response = await axios.get(`${base_url}product/recommenders`, config)
    if (response.data) {
        return response.data
    }
}

const productService = {
    getProducts,
    getProduct,
    getProductsForRecommenders
}

export default productService