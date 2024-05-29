import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from "../../utils/axiosconfig"

const getCart = async () => {
    const response = await axios.get(`${base_url}cart`, config)
    if (response.data) {
        return response.data
    }
}

const addToCart = async (cartData) => {
    const response = await axios.post(`${base_url}cart`, cartData, config)
    if (response.data) {
        return response.data
    }
}

const updateCart = async (cartData) => {
    const response = await axios.put(`${base_url}cart`, cartData, config)
    if (response.data) {
        return response.data
    }
}

const removeProductCart = async (idProd) => {
    const response = await axios.delete(`${base_url}cart/${idProd}`, config)
    if (response.data) {
        return response.data
    }
}

const removeCart = async () => {
    const response = await axios.delete(`${base_url}cart`, config)
    if (response.data) {
        return response.data
    }
}

const cartService = {
    getCart,
    addToCart,
    updateCart,
    removeProductCart,
    removeCart
}

export default cartService