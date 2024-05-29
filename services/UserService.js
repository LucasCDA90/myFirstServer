const UserSchema = require('../schemas/User')
const _ = require("lodash")

// La fonction permet d'ajouter un utilisateur
module.exports.addOneUser = function(user) {
    // N'ajoute que les champs autorisés
    var new_user = _.pick(user, UserSchema.authorized)
    var required_is_include = _.isEqual(_.keys(user).sort(), UserSchema.required.sort())
    console.log(required_is_include)
}

// La fonction permet d'ajouter plusieurs utilisateurs
module.exports.addManyUsers = function() {

}

// La fonction permet de chercher un utilisateur
module.exports.findOneUser = function() {

}

// La fonction permet de chercher plusieurs utilisateurs
module.exports.findManyUsers = function() {

}

// La fonction permet de supprimer un utilisateur
module.exports.deleteOneUser = function() {

}

// La fonction permet de supprimer plusieurs utilisateurs
module.exports.deleteManyUsers = function() {

}

// La fonction permet de modifier un utilisateur
module.exports.updateOneUser = function() {

}

// La fonction permet de modifier plusieurs utilisateurs
module.exports.updateManyUsers = function() {

}