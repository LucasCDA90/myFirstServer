const ArticleService = require('../../services/ArticleService')
const UserService = require('../../services/UserService')
const chai = require('chai');
let expect = chai.expect;
const _ = require('lodash')
var id_article_valid = ""
var tab_id_articles = []
var tab_id_users = []
var articles = []

/* let users = [
    {
        firstName: "luf",
        lastName: "Us",
        username: "dwarfSlayer",
        email: "lutfu.us@gmail.com"
    },

    {
        firstName: "lulu",
        lastName: "brg",
        username: "maidenless",
        email: "maidenless@gmail.com"
    }
] */

/* it("Création de users", (done => {
    UserService.addManyUsers(users, function (err, value) {
        tab_id_users = _.map(value, '_id')
        done()
    })
})) */

describe("addOneArticle", () => {
    it("Article correct. - S", () => {
        var article = {
            name: "Fraise",
            description: "Fraises",
            price: 19.99,
            quantity: 5,
            created_at: new Date(),
            updated_at: new Date()
        }
        ArticleService.addOneArticle(article, function (err, value) {
            expect(value).to.be.a('object');
            expect(value).to.haveOwnProperty('_id')
            id_article_valid = value._id
            articles.push(value)
        })
    })
    it("Article incorrect. (Sans description) - E", () => {
        var article_no_valid = {
            name: "Fraise",
            price: 19.99,
            quantity: 5,
            created_at: new Date(),
            updated_at: new Date()
        }
        ArticleService.addOneArticle(article_no_valid, function (err, value) {
            expect(err).to.haveOwnProperty('msg')
            expect(err).to.haveOwnProperty('fields_with_error').with.lengthOf(1)
            expect(err).to.haveOwnProperty('fields')
            expect(err['fields']).to.haveOwnProperty('name')
            expect(err['fields']['name']).to.equal('Path `name` is required.')
            done()
        })
    })
})

describe("addManyArticles", () => {
    it("Articles à ajouter, valide. - S", (done) => {
        var articles_tab = [{
            name: "Fraise",
            description: "Fraises",
            price: 19.99,
            quantity: 5,
            created_at: new Date(),
            updated_at: new Date()
        }, {
            name: "Fraise",
            description: "Framboises",
            price: 2.99,
            quantity: 4,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            name: "Fraise",
            description: "Bananes",
            price: 9.99,
            quantity: 50,
            created_at: new Date(),
            updated_at: new Date()
        }]

        ArticleService.addManyArticles(articles_tab, function (err, value) {
            tab_id_articles = _.map(value, '_id')
            articles = [...value, ...articles]
            expect(value).lengthOf(3)
            done()
        })
    })
    it("Articles à ajouter, non valide. - E", (done) => {
        var articles_tab_error = [{
            name: "Fraise",
            price: 19.99,
            quantity: 5,
            created_at: new Date(),
            updated_at: new Date()
        }, {
            name: "Fraise",
            description: "Fraises",
            price: "19.99",
            quantity: 5,
            created_at: new Date(),
            updated_at: new Date()
        }]

        ArticleService.addManyArticles(articles_tab_error, function (err, value) {
            done()
        })
    })
})

describe("findOneArticle", () => {
    it("Chercher un article par les champs selectionnés - S.", (done) => {
        ArticleService.findOneArticle(["name", "description"], articles[0].name, function(err, value) {
            expect(value).to.haveOwnProperty('description')
            expect(value).to.haveOwnProperty('price')
            expect(value).to.haveOwnProperty('quantity')
            expect(value).to.haveOwnProperty('created_at')
            expect(value).to.haveOwnProperty('updated_at')
            done()
        })
    })

    it("Chercher un article avec un champ non autorisés - E.", (done) => {
        ArticleService.findOneArticle(["description", "price"], articles[0].name, function(err, value) {
            expect(err).to.haveOwnProperty('type_error')
            done()
        })
    })

    it("Chercher un article sans tableau de champ - E.", (done) => {
        ArticleService.findOneArticle("description", articles[0].name, function(err, value) {
            expect(err).to.haveOwnProperty('type_error')
            done()
        })
    })

    it("Chercher un article inexistant - E.", (done) => {
        ArticleService.findOneArticle(["description"], "articles[0].description", function(err, value) {
            expect(err).to.haveOwnProperty('type_error')
            done()
        })
    })
})

describe("findOneArticleById", () => {
    it("Chercher un article existant correct. - S", (done) => {
        ArticleService.findOneArticleById(id_article_valid, function (err, value) {
            expect(value).to.be.a('object');
            expect(value).to.haveOwnProperty('_id')
            expect(value).to.haveOwnProperty('description')
            done()

        })
    })
    it("Chercher un article non-existant correct. - E", (done) => {
        ArticleService.findOneArticleById("100", function (err, value) {
            expect(err).to.haveOwnProperty('msg')
            expect(err).to.haveOwnProperty('type_error')
            expect(err["type_error"]).to.equal('no-valid')
            done()
        })
    })
})

describe("findManyArticles", () => {
    it("Retourne 3 articles sur les 4. - S", (done) => {
        ArticleService.findManyArticles(null, 1, 3, function(err, value){
            expect(value).to.haveOwnProperty("count")
            expect(value).to.haveOwnProperty("results")
            expect(value["count"]).to.be.equal(4)
            expect(value["results"]).lengthOf(3)
            expect(err).to.be.null
            done()
        })
    })
    it("Envoie chaine de caractere sur page. - E", (done) => {
        ArticleService.findManyArticles(null,"coucou", 3, function(err, value){
            expect(err).to.haveOwnProperty("type_error")
            expect(err["type_error"]).to.be.equal("no-valid")
            expect(value).to.undefined
            done()
        })
    })
})

describe("findManyArticlesById", () => {
    it("Chercher des articles existant correct. - S", (done) => {
        ArticleService.findManyArticlesById(tab_id_articles, function (err, value) {
            expect(value).lengthOf(3)
            done()

        })
    })
})


describe("updateOneArticle", () => {
    it("Modifier un article correct. - S", (done) => {
        ArticleService.updateOneArticle(id_article_valid, { description: "Fraises", price: 19.99 }, function (err, value) {
            expect(value).to.be.a('object')
            expect(value).to.haveOwnProperty('_id')
            expect(value).to.haveOwnProperty('description')
            expect(value).to.haveOwnProperty('price')
            expect(value['description']).to.be.equal('Fraises')
            expect(value['price']).to.be.equal(19.99)
            done()

        })
    })
    it("Modifier un article avec id incorrect. - E", (done) => {
        ArticleService.updateOneArticle("1200", { description: "Fraises", price: 19.99 }, function (err, value) {
            expect(err).to.be.a('object')
            expect(err).to.haveOwnProperty('msg')
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            done()
        })
    })
    it("Modifier un article avec des champs requis vide. - E", (done) => {
        ArticleService.updateOneArticle(id_article_valid, { description: "", price: 19.99 }, function (err, value) {
            expect(value).to.be.undefined
            expect(err).to.haveOwnProperty('msg')
            expect(err).to.haveOwnProperty('fields_with_error').with.lengthOf(1)
            expect(err).to.haveOwnProperty('fields')
            expect(err['fields']).to.haveOwnProperty('description')
            expect(err['fields']['description']).to.equal('Path `description` is required.')
            done()
        })
    })
})

describe("updateManyArticles", () => {
    it("Modifier plusieurs articles correctement. - S", (done) => {
        ArticleService.updateManyArticles(tab_id_articles, { description: "Mangue", price: 1.99 }, function (err, value) {
            expect(value).to.haveOwnProperty('modifiedCount')
            expect(value).to.haveOwnProperty('matchedCount')
            expect(value['matchedCount']).to.be.equal(tab_id_articles.length)
            expect(value['modifiedCount']).to.be.equal(tab_id_articles.length)
            done()

        })
    })
    it("Modifier plusieurs articles avec id incorrect. - E", (done) => {
        ArticleService.updateManyArticles("1200", { description: "Fraises", price: 19.99 }, function (err, value) {
            expect(err).to.be.a('object')
            expect(err).to.haveOwnProperty('msg')
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            done()
        })
    })
    it("Modifier plusieurs articles avec des champs requis vide. - E", (done) => {
        ArticleService.updateManyArticles(tab_id_articles, { description: "", price: 19.99 }, function (err, value) {
            expect(value).to.be.undefined
            expect(err).to.haveOwnProperty('msg')
            expect(err).to.haveOwnProperty('fields_with_error').with.lengthOf(1)
            expect(err).to.haveOwnProperty('fields')
            expect(err['fields']).to.haveOwnProperty('description')
            expect(err['fields']['description']).to.equal('Path `description` is required.')
            done()
        })
    })
})

describe("deleteOneArticle", () => {
    it("Supprimer un article correct. - S", (done) => {
        ArticleService.deleteOneArticle(id_article_valid, function (err, value) { //callback
            expect(value).to.be.a('object')
            expect(value).to.haveOwnProperty('_id')
            expect(value).to.haveOwnProperty('description')
            expect(value).to.haveOwnProperty('price')
            done()
        })
    })
    it("Supprimer un article avec id incorrect. - E", (done) => {
        ArticleService.deleteOneArticle("1200", function (err, value) {
            expect(err).to.be.a('object')
            expect(err).to.haveOwnProperty('msg')
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            done()
        })
    })
    it("Supprimer un article avec un id inexistant. - E", (done) => {
        ArticleService.deleteOneArticle("665f00c6f64f76ba59361e9f", function (err, value) {
            expect(err).to.be.a('object')
            expect(err).to.haveOwnProperty('msg')
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-found')
            done()
        })
    })
})

describe("deleteManyArticles", () => {
    it("Supprimer plusieurs articles correctement. - S", (done) => {
        ArticleService.deleteManyArticles(tab_id_articles, function (err, value) {
            expect(value).to.be.a('object')
            expect(value).to.haveOwnProperty('deletedCount')
            expect(value['deletedCount']).is.equal(tab_id_articles.length)
            done()

        })
    })
    it("Supprimer plusieurs articles avec id incorrect. - E", (done) => {
        ArticleService.deleteManyArticles("1200", function (err, value) {
            expect(err).to.be.a('object')
            expect(err).to.haveOwnProperty('msg')
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            done()
        })
    })

})