import axios from 'axios'
import { base_url } from '../../utils/base_url'

const getProvinces = async () => {
    const response = await axios.get(`${base_url}address/province`)
    if (response.data) {
        return response.data
    }
}

const getDistricts = async (idProvince) => {
    const response = await axios.get(`${base_url}address/${idProvince}`)
    if (response.data) {
        return response.data
    }
}

const getWards = async (data) => {
    const response = await axios.get(`${base_url}address/${data.idProvince}/${data.idDistrict}`)
    if (response.data) {
        return response.data
    }
}

const addressService = {
    getProvinces,
    getDistricts,
    getWards
}

export default addressService