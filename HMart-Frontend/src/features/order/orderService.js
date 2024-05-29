import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from "../../utils/axiosconfig"

const getOrder = async () => {
    const response = await axios.get(`${base_url}order`, config)
    if (response.data) {
        return response.data
    }
}

const createOrder = async (orderData) => {
    const response = await axios.post(`${base_url}order`, orderData, config)
    if (response.data) {
        return response.data
    }
}

const createPayment = async (paymentData) => {
    const response = await axios.post(`${base_url}order/create_payment_url`, paymentData)
    if (response.data) {
        return response.data
    }
}

const returnPayment = async (query) => {
    const response = await axios.get(`${base_url}order/vnpay_return${query}`)
    if (response.data) {
        return response.data
    }
}

const orderService = {
    getOrder,
    createOrder,
    createPayment,
    returnPayment
}

export default orderService