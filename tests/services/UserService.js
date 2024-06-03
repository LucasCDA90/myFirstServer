const UserService = require('../../services/UserService')
const chai = require('chai');
let expect = chai.expect;

describe("UserService", () => {
    describe("addOneUser", () => {
        it("Utilisateur valide. - S", () => {
            var user_valid = {
                firstName: "Edouard",
                lastName: "Dupont",
                email: "edouard.dupont@gmail.com",
                username: "edupont"
            }
            UserService.addOneUser(user_valid, function (err, value) {
                expect(value).to.be.a('object');
                expect(value).to.haveOwnProperty('id')
            })
        })
        it("Sans nom d'utilisateur. - E", () => {
            var user_without_username = {
                firstName: "Edouard",
                lastName: "Dupont",
                email: "edouard.dupont@gmail.com"
            }
            UserService.addOneUser(user_without_username, function (err, value) {
                expect(err).to.haveOwnProperty('msg')
                expect(err).to.haveOwnProperty('key_required_not_include').with.lengthOf(1)

            })
        })

        it("Avec un champs en trop. - S", () => {
            var user_with_not_authorized_key = {
                firstName: "Edouard",
                lastName: "Dupont",
                email: "edouard.dupont@gmail.com",
                username: "edupont",
                testing: true,
                phone: "0645102340"
            }
            UserService.addOneUser(user_with_not_authorized_key, function (err, value) {
                expect(value).to.be.a('object');
                expect(value).to.haveOwnProperty('id')
                expect(value).not.haveOwnProperty('testing')
            })
        })

        it("Avec un champs requis vide. - E", () => {
            var user_with_not_authorized_key = {
                firstName: "Edouard",
                lastName: "Dupont",
                email: "edouard.dupont@gmail.com",
                username: "",
                testing: true,
                phone: "0645102340"
            }
            UserService.addOneUser(user_with_not_authorized_key, function (err, value) {
                expect(err).to.haveOwnProperty('msg')
                expect(err).to.haveOwnProperty('key_required_empty').with.lengthOf(1)

            })
        })

    })
    describe("updateOneUser", () => {
        it("Modification d'un utilisateur correct. - S", () => {
            UserService.updateOneUser('1', { lastName: "Maurice" }, function (err, value) {
                expect(value).to.be.a('object');
                expect(value).to.haveOwnProperty('id')
                expect(value).to.haveOwnProperty('lastName')
                expect(value.lastName).to.equal("Maurice")
            })
        })
        it("Modification d'un utilisateur avec un champs requis, vide. - E", () => {
            UserService.updateOneUser('1', { lastName: "" }, function (err, value) {
                expect(err).to.haveOwnProperty('msg')
                expect(err).to.haveOwnProperty('key_required_empty').with.lengthOf(1, "Le tableau n'a pas retourne le nombre correcte d'element empty.")
            })
        })
        it("Modification d'un utilisateur avec un id invalide. - E", () => {
            UserService.updateOneUser('100', { lastName: "Edouard" }, function (err, value) {
                expect(err).to.haveOwnProperty('msg')
                expect(err).to.haveOwnProperty('key_required_empty').with.lengthOf(0)
                expect(err).to.haveOwnProperty('key_required_not_include').with.lengthOf(0)

            })
        })
    })
    describe("addManyUsers", () => {
        it("Ajout de plusieurs utilisateurs non correcte. - E", () => {

            var users_tab_error = [{
                firstName: "Edouard",
                lastName: "Dupont",
                email: "edouard.dupont@gmail.com",
                username: "edupont"
            }, {
                firstName: "Edouard",
                lastName: "Dupont",
                email: "edouard.dupont@gmail.com",
                username: "",
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
            }, {
                firstName: "Edouard",
                lastName: "Dupont",
                email: "edouard.dupont@gmail.com"
            }]
            UserService.addManyUsers(users_tab_error, function (err, value) {
                expect(err).to.have.lengthOf(2);
                expect(err[0]).to.haveOwnProperty('msg')
                expect(err[0]).to.haveOwnProperty('key_required_empty').with.lengthOf(1)
                expect(err[1]).to.haveOwnProperty('msg')
                expect(err[1]).to.haveOwnProperty('key_required_empty').with.lengthOf(0)
                expect(err[1]).to.haveOwnProperty('key_required_not_include').with.lengthOf(1)

            })
        })
        it("Ajout de plusieurs utilisateurs tous correct. - S", () => {
            var users_tab_error = [{
                firstName: "Edouard",
                lastName: "Dupont",
                email: "edouard.dupont@gmail.com",
                username: "edupont"
            }, {
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
            }]
            UserService.addManyUsers(users_tab_error, function (err, value) {
                expect(value).to.have.lengthOf(users_tab_error.length);
                value.forEach((e) => {
                    expect(e).to.be.a('object');
                    expect(e).to.haveOwnProperty('id')
                    expect(e).to.haveOwnProperty('lastName')

                })
            })
        })
    })
    describe("findOneUser", () => {
        it("Chercher un utilisateur existant correct. - S", () => {

            UserService.findOneUser("1", function (err, value) {
                expect(value).to.be.a('object');
                //console.log(err)
                expect(value).to.haveOwnProperty('id')
                expect(value).to.haveOwnProperty('lastName')
                expect(value['id']).to.equal('1')
            })
        })
        it("Chercher un utilisateur non-existant correct. - E", () => {

            UserService.findOneUser("100", function (err, value) {
                expect(err).to.haveOwnProperty('msg')
                expect(err).to.haveOwnProperty('error_type')
                expect(err["error_type"]).to.equal('Not-Found')
            })
        })

    })
    describe("findManyUsers", () => {
        it("Chercher plusieurs utilisateurs existants. - S", () => {
            var tabIds = ["1", "2"]
            UserService.findManyUsers(tabIds, function (err, value) {
                expect(value).to.have.lengthOf(tabIds.length);
                value.forEach((e) => {
                    expect(e).to.be.a('object');
                    expect(e).to.haveOwnProperty('id')
                    expect(e).to.haveOwnProperty('lastName')
                })
            })
        })
        it("Chercher plusieurs utilisateurs qui n'existent pas. - S", () => {
            var tabIds = ["100", "200"]
            UserService.findManyUsers(tabIds, function (err, value) {
                expect(value).to.have.lengthOf(0);
            })
        })
    })
    describe("deleteOneUser", () => {
        it("Supprimer un utilisateur qui existe. - S", () => {
            UserService.deleteOneUser("1", function (err, value) {
                expect(value).to.be.a('object');
                expect(value).to.haveOwnProperty('msg')
                expect(value).to.haveOwnProperty('user_delete')
                expect(value['user_delete']).to.haveOwnProperty('id')
                expect(value['user_delete']['id']).to.be.equal('1')
            })
        })
        it("Supprimer un utilisateur qui n'existe pas. - E", () => {
            UserService.deleteOneUser("100", function (err, value) {
                expect(err).to.be.a('object');
                expect(err).to.haveOwnProperty('msg')
            })
        })
    })
    describe("deleteManyUsers", () => {
        it("Supprimer plusieurs utilisateurs tous find. - S", () => {
            var idTab = ["2"]
            UserService.deleteManyUsers(idTab, function (err, value) {
                expect(value).to.be.a('object');
                expect(value).to.haveOwnProperty('msg')
                expect(value).to.haveOwnProperty('count_remove')
                expect(value['count_remove']).to.equal(idTab.length)
            })
        })
        it("Supprimer plusieurs utilisateurs pas tous find. - S", () => {
            var idTab = ["2", "3"]
            UserService.deleteManyUsers(idTab, function (err, value) {
                expect(value).to.be.a('object');
                expect(value).to.haveOwnProperty('msg')
                expect(value).to.haveOwnProperty('count_remove')
                expect(value['count_remove']).to.equal(idTab.length-1)
            })
        })
    })
})
/* 



UserService.updateOneUser('1', {lastName: "Maurice"},function(err, value) {
    if (err)
        console.log("Une erreur s'est produite.", err.msg)
    else {
        console.log(value)
    }
}) 

UserService.updateOneUser('1', {lastName: ""},function(err, value) {
    if (err)
        console.log("Une erreur s'est produite.", err.msg)
    else {
        console.log(value)
    }
}) 


var users_tab_error = [{
    firstName: "Edouard",
    lastName: "Dupont",
    email: "edouard.dupont@gmail.com",
    username: "edupont"
},{
    firstName: "Edouard",
    lastName: "Dupont",
    email: "edouard.dupont@gmail.com",
    username: "",
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
},{
    firstName: "Edouard",
    lastName: "Dupont",
    email: "edouard.dupont@gmail.com"
}]

console.log("ADD MANY")
UserService.addManyUsers(users_tab_error,function(err, value) {
    if (err)
        console.log("Une erreur s'est produite.", err.msg)
    else {
        console.log(value)
    }
}) 


var users_tab_error = [{
    firstName: "Edouard",
    lastName: "Dupont",
    email: "edouard.dupont@gmail.com",
    username: "edupont"
},{
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
}]

console.log("ADD MANY")
UserService.addManyUsers(users_tab_error,function(err, value) {
    if (err)
        console.log("Une erreur s'est produite.", err.msg)
    else {
        console.log(value)
    }
}) 

console.log("CHERCHER PLUSIEURS UTILISATEURS")
var tabIds = ["100", "200"]
UserService.findManyUsers(tabIds, function(err, value) {
    console.log(value)
}) */