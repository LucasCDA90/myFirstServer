const UserSchema = require('../schemas/User')
const _ = require("lodash")
const async = require('async')

// La fonction permet d'ajouter un utilisateur.
module.exports.addOneUser = function(user, callback) {
    // N'ajoute que les champs autorisés
    var new_user = _.pick(user, UserSchema.authorized)
    new_user.id = _.uniqueId()
    var required_isnt_include = _.difference(UserSchema.required.sort(), _.keys(_.pick(new_user, UserSchema.required)).sort())
    var required_is_empty = _.filter(UserSchema.required, (e) => { return _.isEmpty(new_user[e]) })
    required_is_empty = _.difference( required_is_empty, required_isnt_include)
    var text_error = ""
    if (required_isnt_include.length > 0) {
        text_error += `Une des propriétés requise (${required_isnt_include.join(', ')}) n'est pas inclue. `
    }
    if (required_is_empty.length > 0) {
        text_error += `Une des propriétés requise (${required_is_empty.join(', ')}) est inclue mais vide.`
    }
    var error = {
        msg: text_error,
        key_required_not_include: required_isnt_include,
        key_required_empty:required_is_empty
    }
    if (required_isnt_include.length > 0 || required_is_empty.length > 0) {
        callback(error)
    } else {
        UserSchema.elements.push(new_user)
        callback(null, new_user)
    }
}

// La fonction permet d'ajouter plusieurs utilisateurs
module.exports.addManyUsers = function(users, callback) {
    var i = 0;
    async.map(users, function(user, next, index) {
        checkSchemaUser(user, function(err, value) {
            if (err) {
                err.index = i;
                next(null, err);
            } else {
                next(null, null);
            }
        });
        i++;
    }, function(err, val) {
        var error = _.filter(val, (e) => { return !_.isEmpty(e); });
        if (error.length > 0) {
            callback(error);
        } else {
            async.map(users, checkSchemaUser, function(err, val) {
                console.log(val);
                var tab = _.map(val, (e) => { e.id = _.uniqueId(); return e; });
                UserSchema.elements = [...UserSchema.elements, ...tab];
                callback(null, val);
            });
        }
    });
};
/* Une fois tous les utilisateurs vérifiés :

Les erreurs sont filtrées.
Si des erreurs sont trouvées, le callback est appelé avec ces erreurs.
Si aucune erreur n'est trouvée, async.map est utilisé à nouveau pour vérifier les utilisateurs.
Chaque utilisateur reçoit un identifiant unique (_.uniqueId()).
Les utilisateurs vérifiés sont ajoutés à UserSchema.elements.
Le callback est appelé avec le tableau des utilisateurs ajoutés. */

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

// La fonction permet de modifier un utilisateur existant.
module.exports.updateUser = function(userId, updates, callback) {
    
    var user = _.find(UserSchema.elements, { id: userId });
    if (!user) {
        return callback({ msg: "Utilisateur non trouvé." });
    }

    // N'ajoute que les champs autorisés
    var updated_user = _.pick(updates, UserSchema.authorized);
    
    // Créer une version de l'utilisateur avec les mises à jour appliquées
    var new_user = _.assign({}, user, updated_user);

    // Vérifier les champs requis
    var required_is_empty = _.filter(UserSchema.required, (e) => { return _.isEmpty(new_user[e]) });
    var text_error = "";
    if (required_is_empty.length > 0) {
        text_error += `Une des propriétés requise (${required_is_empty.join(', ')}) est inclue mais vide.`;
    }
    var error = {
        msg: text_error,
        key_required_empty: required_is_empty
    };
    if (required_is_empty.length > 0) {
        callback(error);
    } else {
        // Mettre à jour l'utilisateur dans le schéma
        _.assign(user, updated_user);
        callback(null, user);
    }
}

// La fonction permet de modifier plusieurs utilisateurs
module.exports.updateManyUsers = function() {

}