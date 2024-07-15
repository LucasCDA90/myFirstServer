const { default: mongoose } = require('mongoose');

/* Connexion à la base de donnée */
require('../utils/database');

describe("UserService", () => {
    require('./services/UserService.test')
})

describe("UserController", () => {
    require('./controllers/UserController.test')
})

describe("ArticleService", () => {
    require('./services/ArticleService.test')
})

describe("ArticleController", () => {
    require('./controllers/ArticleController.test')
})

describe("API - Mongo", () => {
    it("Vider les db. - S", () => {
        if (process.env.npm_lifecycle_event == "test")
            mongoose.connection.db.dropDatabase()
    })
})