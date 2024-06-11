// 1ere chose à faire, importer les librairies
const express = require('express')              
const _ = require("lodash")
const bodyParser = require('body-parser')
const Config = require ('./config')

// Création de notre application express.js
const app = express()
// Déclaration des middlewares à express
app.use(bodyParser.json())

// Démarrage de la database
require('./utils/database')

// Déclaration des controllers pour l'utilisateur
const UserController = require('./controllers/UserController')

/*--------------------- Création des routes (User - Utilisateur) ---------------------*/

// Création du endpoint /user pour l'ajout d'un utilisateur
app.post('/user', UserController.addOneUser)
// Création du endpoint /user pour l'ajout de plusieurs utilisateurs
app.post('/users', UserController.addManyUsers)
// Création du endpoint /user pour la récupération d'un utilisateur
app.get('/user/:id', UserController.findOneUser)
// Création du endpoint /user pour la récupération de plusieurs utilisateurs
app.get('/users', UserController.findManyUsers)
// Création du endpoint /user pour la modification d'un utilisateur
app.put('/user', UserController.updateOneUser)
// Création du endpoint /user pour la modification de plusieurs utilisateurs
app.put('/users', UserController.updateManyUsers)
// Création du endpoint /user pour la suppression d'un utilisateur
app.delete('/user/:id', UserController.deleteOneUser)
// Création du endpoint /user pour la suppression de plusieurs utilisateurs
app.delete('/users', UserController.deleteManyUsers)


// 2e chose à faire : Créer le server avec app.listen
app.listen(Config.port, () => {                 
    console.log(`${(new Date()).toLocaleString()}: Le serveur est démarré.`)
})

