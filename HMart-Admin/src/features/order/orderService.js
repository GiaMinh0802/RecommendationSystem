import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

const getOrders = async () => {
    const response = await axios.get(`${base_url}order/all?page=1&limit=1000`)
    return response.data
}

const getOrderById = async (id) => {
    const response = await axios.get(`${base_url}order/${id}`)
    return response.data
}

const getStatistics = async () => {
    const response = await axios.get(`${base_url}order/statistic`)
    return response.data
}

const orderService = {
    getOrders,
    getOrderById,
    getStatistics
}

export default orderService