const ArticleService = require('../services/ArticleService')
const LoggerHttp = require ('../utils/logger').http

// La fonction permet d'ajouter un article
module.exports.addOneArticle = function(req, res) {
    LoggerHttp(req, res)
    req.log.info("Création d'un article")
    ArticleService.addOneArticle(req.body, function(err, value) {
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
    req.log.info("Création de plusieurs articles")
    ArticleService.addManyArticles(req.body, function(err, value) {
        if (err) {
            res.statusCode = 405
            res.send(err)
        }
        
        else {
            res.statusCode = 201
            res.send(value)
        }
    })
}

// La fonction permet de chercher un article
module.exports.findOneArticle = function(req, res) {
    req.log.info("Recherche d'un article avec un champ choisi")
    let arg = req.query.fields
    if (arg && !Array.isArray(arg))
        arg = [arg]
    ArticleService.findOneArticle(arg, req.query.value, function(err, value) {        
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

// La fonction permet de chercher un article avec id
module.exports.findOneArticleById = function(req, res) {
    req.log.info("Recherche d'un article avec id")
    ArticleService.findOneArticleById(req.params.id, function(err, value) {        
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
module.exports.findManyArticles = function(req, res) {
    req.log.info("Recherche d'un article avec un champ choisi")
    let page = req.query.page
    let pageSize = req.query.pageSize
    let search = req.query.q
    ArticleService.findManyArticles(search, page, pageSize, function(err, value) {        
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
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg=[arg]
    ArticleService.findManyArticlesById(arg, function(err, value) {
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

// La fonction permet de supprimer un article
module.exports.deleteOneArticle = function(req, res) {
    LoggerHttp(req, res)
    req.log.info("Suppression d'un article")
    ArticleService.deleteOneArticle(req.params.id, function(err, value) {        
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
    req.log.info("Suppression de plusieurs article")
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    ArticleService.deleteManyArticles(arg, function(err, value) {
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


// La fonction permet de modifier un article
module.exports.updateOneArticle = function(req, res) {
    LoggerHttp(req, res)
    req.log.info("Modification d'un article")
    ArticleService.updateOneArticle(req.params.id, req.body, function(err, value) {
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
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var updateData = req.body
    ArticleService.updateManyArticles(arg, updateData, function(err, value) {
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