const mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Category', categorySchema)