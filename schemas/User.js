const mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    phone: String,
    password: {
        type: String,
        required: true
    },
    token: String
})

module.exports = UserSchema