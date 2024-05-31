const UserService = require('../../services/UserService')

// ------------ addOneUser ------------ //
// Avec un utilsiateur valide
var user_valid = {
    firstName: "Edouard",
    lastName: "Dupont",
    email: "edouard.dupont@gmail.com",
    username: "edupont"
}
/* UserService.addOneUser(user_valid, function(err, value) {
    if (err)
        console.log("Une erreur s'est produite.", err.msg)
    else {
        console.log(value)
    }
}) */

// Sans nom d'utilisateur
var user_without_username = {
    firstName: "Edouard",
    lastName: "Dupont",
    email: "edouard.dupont@gmail.com"
}
UserService.addOneUser(user_without_username, function(err, value) {
    if (err)
        console.log("Une erreur s'est produite.", err.msg)
    else {
        console.log(value)
    }
})
// Avec un champs en trop
var user_with_not_authorized_key = {
    firstName: "Edouard",
    lastName: "Dupont",
    email: "edouard.dupont@gmail.com",
    username: "edupont",
    testing: true,
    phone: "0645102340"
}
 UserService.addOneUser(user_with_not_authorized_key, function(err, value) {
    if (err)
        console.log("Une erreur s'est produite.", err.msg)
    else {
        console.log(value)
    }
})
// Avec un champs requis vide
var user_with_not_authorized_key = {
    firstName: "Edouard",
    lastName: "Dupont",
    email: "edouard.dupont@gmail.com",
    username: "",
    testing: true,
    phone: "0645102340"
}
UserService.addOneUser(user_with_not_authorized_key, function(err, value) {
    if (err)
        console.log("Une erreur s'est produite.", err.msg)
    else {
        console.log(value)
    }
})

var users_tab_error = [
    {
        firstName: "Edouard",
        lastName: "Dupont",
        email: "edouard.dupont@gmail.com",
        username: "edupont"
    },
    {
        firstName: "Edouard",
        lastName: "Dupont",
        email: "edouard.dupont@gmail.com",
        username: "La",
        testing: true,
        phone: "0645102340"
    },
    {
        firstName: "Edouard",
        lastName: "Dupont",
        email: "edouard.dupont@gmail.com",
        username: "edupont",
        testing: true,
        phone: "0645102340"
    }
];

console.log("ADD MANY");
UserService.addManyUsers(users_tab_error, function(err, value) {
    if (err) {
        console.log("Une erreur s'est produite.", err.msg);
    } else {
        console.log(value);
    }
});