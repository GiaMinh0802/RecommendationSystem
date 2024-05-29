const express = require('express')
const router = express.Router()
const { getProvinces, getDistricts, getWards } = require('../controllers/addressController')

router.get('/province', getProvinces)
router.get('/:idProvince', getDistricts)
router.get('/:idProvince/:idDistrict', getWards)

module.exports = router;