import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from "../../utils/axiosconfig"

const getRating = async (idProd) => {
    const response = await axios.get(`${base_url}rating/${idProd}`)
    if (response.data) {
        return response.data
    }
}

const ratingProduct = async (ratingData) => {
    const response = await axios.post(`${base_url}rating`, ratingData, config)
    if (response.data) {
        return response.data
    }
}

const ratingService = {
    getRating,
    ratingProduct
}

export default ratingService