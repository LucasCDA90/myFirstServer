const UserService = require('../../services/UserService')

// ------------ addOneUser ------------ //
// Avec un utilisateur valide
var user_valid = {
    firstName: "Edouard",
    lastName: "Dupont",
    email: "edouard.dupont@gmail.com",
    username: "edupont"
}
UserService.addOneUser(user_valid)
// Sans nom d'utilisateur
var user_without_username = {
    firstName: "Edouard",
    lastName: "Dupont",
    email: "edouard.dupont@gmail.com"
}
UserService.addOneUser(user_without_username)
// Avec un champs en trop
var user_with_not_authorized_key = {
    firstName: "Edouard",
    lastName: "Dupont",
    email: "edouard.dupont@gmail.com",
    username: "edupont",
    testing: true
}
UserService.addOneUser(user_with_not_authorized_key)