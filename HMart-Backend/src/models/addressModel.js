const mongoose = require("mongoose")

var addressSchema = new mongoose.Schema({
    province: {
        type: String,
        required: true,
        unique: true
    },
    districts: [
        {
            name: String,
            wards: [
                {
                    name: String
                }
            ]
        }
    ]
}, { versionKey: false })

module.exports = mongoose.model("Address", addressSchema)