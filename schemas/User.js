var userInformation = {
    required: ["firstName", "lastName", "username", "email"],
    authorized: ["firstName", "lastName", "username", "email", "phone"],
    unique: ["username", "email"],
    elements: []
}

module.exports = userInformation