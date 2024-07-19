const ArticleService = require('../services/ArticleService')
const LoggerHttp = require ('../utils/logger').http

// La fonction permet d'ajouter un article
module.exports.addOneArticle = function(req, res) {
    LoggerHttp(req, res)
    req.log.info("Création d'un article")
    let options = {user: req.user}

    ArticleService.addOneArticle(req.body, options, function(err, value) {
        if (err && err.type_error == "no found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "validator") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "duplicate") {
            res.statusCode = 405
            res.send(err)   
        }
        else {
            res.statusCode = 201
            res.send(value)
        }
    })
}

// La fonction permet d'ajouter plusieurs articles
module.exports.addManyArticles = function(req, res) {
    LoggerHttp(req, res)
    req.log.info("Création de plusieurs articles")
    let options = {user: req.user}

    ArticleService.addManyArticles(req.body, options, function(err, value) {
        if (err) {
            res.statusCode = 405
            res.send(err)
        }else {
            res.statusCode = 201
            res.send(value)
        }
    })
}

// La fonction permet de chercher un article
module.exports.findOneArticleById = function(req, res) {
    req.log.info("Recherche d'un article par son id")
    let opts = {populate: req.query.populate}

    ArticleService.findOneArticleById(req.params.id, opts, function(err, value) {        
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "no-valid") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
            res.send(err)
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}

// La fonction permet de chercher plusieurs articles
module.exports.findManyArticlesById = function(req, res) {
    LoggerHttp(req, res)
    req.log.info("Recherche de plusieurs articles", req.query.id)
    let arg = req.query.id
    let opts = {populate: req.query.populate}
    if (arg && !Array.isArray(arg))
        arg=[arg]

    ArticleService.findManyArticlesById(arg, opts, function(err, value) {
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "no-valid") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
            res.send(err)
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}

// La fonction permet de chercher un utilisateur par les champs autorisé
module.exports.findOneArticle = function(req, res){
    LoggerHttp(req, res)
    req.log.info("Recherche d'un article par un champ autorisé")
    let fields = req.query.fields
    let opts = {populate: req.query.populate}
    if (fields && !Array.isArray(fields))
        fields = [fields]

    ArticleService.findOneArticle(fields, req.query.value, opts, function(err, value) {        
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "no-valid") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
            res.send(err)
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}

// La fonction permet de chercher plusieurs utilisateurs
module.exports.findManyArticles = function(req, res) {
    req.log.info("Recherche de plusieurs articles")
    let page = req.query.page
    let pageSize = req.query.pageSize
    let searchValue = req.query.q
    let opts = {populate: req.query.populate}

    ArticleService.findManyArticles(searchValue, pageSize, page,  opts, function(err, value) {        
        if (err && err.type_error == "no-valid") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
            res.send(err)
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}

// La fonction permet de modifier un article
module.exports.updateOneArticle = function(req, res) {
    LoggerHttp(req, res)
    req.log.info("Modification d'un article")
    let update = req.body
    let options = {user: req.user}

    ArticleService.updateOneArticle(req.params.id, update, options, function(err, value) {
        //
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && (err.type_error == "no-valid" || err.type_error == "validator" || err.type_error == "duplicate" ) ) {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}

// La fonction permet de modifier plusieurs articles
module.exports.updateManyArticles = function(req, res) {
    LoggerHttp(req, res)
    req.log.info("Modification de plusieurs articles")
    var arg = req.query.id
    let options = {user: req.user}

    if (arg && !Array.isArray(arg))
        arg = [arg]
    var updateData = req.body
    ArticleService.updateManyArticles(arg, updateData, options, function(err, value) {
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && (err.type_error == "no-valid" || err.type_error == "validator" || err.type_error == 'duplicate')) {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}

// La fonction permet de supprimer un article
module.exports.deleteOneArticle = function(req, res) {
    LoggerHttp(req, res)
    req.log.info("Suppression d'un article")
    ArticleService.deleteOneArticle(req.params.id, null, function(err, value) {        
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "no-valid") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
            res.send(err)
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}

// La fonction permet de supprimer plusieurs articles
module.exports.deleteManyArticles = function(req, res) {
    LoggerHttp(req, res)
    req.log.info("Suppression de plusieurs articles")
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    ArticleService.deleteManyArticles(arg, null, function(err, value) {
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "no-valid") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}