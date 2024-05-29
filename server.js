// 1ere chose à faire, importer les librairies
const express = require('express')              
const _ = require("lodash")
const bodyParser = require('body-parser')
const Config = require ('./config')

// Création de notre application express.js
const app = express()
// Déclaration des middlewares à express
app.use(bodyParser.json())

// Déclaration des controllers pour l'utilisateur
const UserController = require('./controllers/UserController')

/*--------------------- Création des routes (User - Utilisateur) ---------------------*/

// Création du endpoint /user pour l'ajout d'un utilisateur
app.post('/user', UserController.addOneUser)
// Création du endpoint /user pour l'ajout de plusieurs utilisateurs
app.post('/user', UserController.addManyUser)
// Création du endpoint /user pour la récupération d'un utilisateur
app.post('/user', UserController.findOneUser)
// Création du endpoint /user pour la récupération de plusieurs utilisateurs
app.post('/user', UserController.findManyUser)
// Création du endpoint /user pour la modification d'un utilisateur
app.post('/user', UserController.updateOneUser)
// Création du endpoint /user pour la modification de plusieurs utilisateurs
app.post('/user', UserController.updateManyUser)
// Création du endpoint /user pour la suppression d'un utilisateur
app.post('/user', UserController.deleteOneUser)
// Création du endpoint /user pour la suppression de plusieurs utilisateurs
app.post('/user', UserController.deleteManyUser)



app.listen(Config.port, () => {                 // 2e chose à faire : Créer le server avec app.listen
    console.log(`${(new Date()).toLocaleString()}: Le serveur est démarré.`)
})

