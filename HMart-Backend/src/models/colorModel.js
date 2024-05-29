const mongoose = require('mongoose')

var colorSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    color: {
        type: String,
        required: true
    },
}, { versionKey: false })

module.exports = mongoose.model('Color', colorSchema)