const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var ArticleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    }
    /* user_id:
    {
        type: ObjectId,
        required: true
    } */
})

module.exports = ArticleSchema