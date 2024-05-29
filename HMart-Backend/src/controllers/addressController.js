const Address = require('../models/addressModel')
const asyncHandler = require('express-async-handler')
const validateID = require('../utils/validate')

const getProvinces = asyncHandler(async (req, res) => {
    try {
        const findProvince = await Address.find().select("_id province")
        res.json(findProvince)
    } catch (error) {
        throw new Error(error)
    }
})

const getDistricts = asyncHandler(async (req, res) => {
    const { idProvince } = req.params
    validateID(idProvince)
    try {
        const findDistrict = await Address.findById(idProvince).select("districts")
        const districts = findDistrict.districts.map(district => ({
            _id: district._id,
            district: district.name
        }))
        res.json(districts)
    } catch (error) {
        throw new Error(error)
    }
})

const getWards = asyncHandler(async (req, res) => {
    const { idProvince, idDistrict } = req.params
    validateID(idProvince)
    validateID(idDistrict)
    try {
        const province = await Address.findById(idProvince).select("districts")
        const district = province.districts.find(district => district._id == idDistrict)
        const wards = district.wards.map(ward => ({
            _id: ward._id,
            ward: ward.name
        }))
        res.json(wards)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { getProvinces, getDistricts, getWards }