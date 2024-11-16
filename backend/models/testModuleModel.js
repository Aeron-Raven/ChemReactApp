const mongoose = require('mongoose');

const Schema = mongoose.Schema

const testSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    question:{
        type: Object,
        required: true
    },
    over: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('TestModule', testSchema)