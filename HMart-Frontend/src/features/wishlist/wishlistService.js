import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from "../../utils/axiosconfig"

const getWishlist = async () => {
    const response = await axios.get(`${base_url}wishlist`, config)
    if (response.data) {
        return response.data
    }
}

const addToWishlist = async (wishlistData) => {
    const response = await axios.post(`${base_url}wishlist`, wishlistData, config)
    if (response.data) {
        return response.data
    }
}

const wishlistService = {
    getWishlist,
    addToWishlist
}

export default wishlistService