const chai = require('chai');
const chaiHttp = require('chai-http');
const UserService = require('../../services/UserService')
const expect = chai.expect;
const server = require('./../../server')
let should = chai.should();
const _ = require('lodash')

var articles = []

var tab_id_users = []
let users = [
    {
        firstName: "Détenteur d'article 1",
        lastName: "Iencli",
        username: "oui1",
        email:"iencli1@gmail.com"
    },
    {
        firstName: "Détenteur d'article 2",
        lastName: "Iencli",
        username: "oui2",
        email:"iencli2@gmail.com"
    },
    {
        firstName: "Détenteur d'article 3",
        lastName: "Iencli",
        username: "oui3",
        email:"iencli3@gmail.com"
    },
    {
        firstName: "Détenteur d'article 4",
        lastName: "Iencli",
        username: "oui4",
        email:"iencli4@gmail.com"
    },
];

it("Création des utilisateurs fictif", (done) => {
    UserService.addManyUsers(users, null, function (err, value) {
        tab_id_users = _.map(value, '_id')
        done()
    })
})

function rdm_user (tab) {
    let rdm_id = tab[Math.floor(Math.random() * (tab.length - 1))]
    return rdm_id
}

chai.use(chaiHttp)


describe("POST - /article", () => {
    it("Ajouter un article. - S", (done) => {
        chai.request(server).post('/article').send({
            name: "Fraissse",
            description: "Fraises",
            price: 19.99,
            quantity: 5,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_user(tab_id_users)
        }).end((err, res) => {
            expect(res).to.have.status(201)
            articles.push(res.body)
            done()
        });
    })
    it("Ajouter un article incorrect. (Sans name) - E", (done) => {
        chai.request(server).post('/article').send({
            description: "Fraisessssss",
            price: 19.99,
            quantity: 5,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_user(tab_id_users)
        }).end((err, res) => {
            expect(res).to.have.status(405)
            done()
        })
    })
    it("Ajouter un article incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/article').send({
            name: "Fraisesss",
            description: "",
            price: 19.99,
            quantity: 5,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_user(tab_id_users)
        }).end((err, res) => {
            expect(res).to.have.status(405)
            done()
        })
    })
})

describe("POST - /articles", () => {
    it("Ajouter plusieurs articles. - S", (done) => {
        chai.request(server).post('/articles').send([{
            name: "Fraise",
            description: "Fraises",
            price: 19.99,
            quantity: 4,
            created_at: Date.now(),
            updated_at: Date.now(),
            user_id: rdm_user(tab_id_users)
        },

        {
            name: "Bananes",
            description: "Bananes",
            price: 9.99,
            quantity: 40,
            created_at: Date.now(),
            updated_at: Date.now(),
            user_id: rdm_user(tab_id_users)
        }]
        ).end((err, res) => {
            res.should.have.status(201)

            articles = [...articles, ...res.body]
            done()
        });
    })
})

describe("GET - /article", () => {
    it("Chercher un article par un champ selectionné. - S", (done) => {
        chai.request(server).get('/article').query({fields: ["name"], value: articles[0].name})
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })

    it("Chercher un article par un champ non autorisé. - E", (done) => {
        chai.request(server).get('/article').query({fields: ["quantity"], value: articles[0].quantity})
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })

    it("Chercher un article sans aucune query. - E", (done) => {
        chai.request(server).get('/article')
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })

    it("Chercher un article inexistant. - E", (done) => {
        chai.request(server).get('/article').query({fields: ["name"], value: "Mathislebg"})
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })
})

// GET /article

describe("GET - /article:id", () => {
    it("Chercher un article correct. - S", (done) => {
        chai.request(server).get('/article/' + articles[0]._id)
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })

    it("Chercher un article incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).get('/article/665f18739d3e172be5daf092')
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })

    it("Chercher un article incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).get('/article/123')
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    
})

describe("GET - /articles", () => {
    it("Chercher plusieurs articles. - S", (done) => {
        chai.request(server).get('/articles').query({id: _.map(articles, '_id')})
        .end((err, res) => {
            res.should.have.status(200)
            expect(res.body).to.be.an('array')
            done()
        })
    })

    it("Chercher plusieurs articles incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).get('/articles').query({id: ["66791a552b38d88d8c6e9ee7", "66791a822b38d88d8c6e9eed"]})
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })

    it("Chercher plusieurs articles incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).get('/articles').query({id: ['123', '456']})
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe("GET - /articles_by_filter", () => {
    it("Chercher plusieurs articles. - S", (done) => {
        chai.request(server).get('/articles_by_filter').query({page: 1, pageSize: 2})
        .end((err, res) => {
            res.should.have.status(200)
            expect(res.body.results).to.be.an('array')
            done()
        })
    })
    it("Chercher plusieurs articles avec une query vide. - S", (done) => {
        chai.request(server).get('/articles_by_filter')
        .end((err, res) => {
            res.should.have.status(200)
            expect(res.body.results).to.be.an('array')
            expect(res.body.count).to.be.equal(3)
            done()
        })
    })
    it("Chercher plusieurs articles avec une chaine de caractere dans page. - E", (done) => {
        chai.request(server).get('/articles_by_filter').query({page: "une phrase", pageSize: 2})
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe("PUT - /article", () => {
    it("Modifier un article. - S", (done) => {
        chai.request(server).put('/article/' + articles[0]._id).send({ name: "Olivier" })
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })

    it("Modifier un article avec un id invalide. - E", (done) => {
        chai.request(server).put('/article/123456789').send({name: "Olivier", description: "Edouard"})
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })

    it("Modifier un article avec un id inexistant. - E", (done) => {
        chai.request(server).put('/article/66791a552b38d88d8c6e9ee7').send({name: "Olivier", description: "Edouard"})
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })

    it("Modifier un article avec un champ requis vide. - E", (done) => {
        chai.request(server).put('/article/' + articles[0]._id).send({ name: "", description: "Edouard" })
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })

    // it("Modifier un article avec un champ unique existant. - E", (done) => {
    //     chai.request(server).put('/article/' + articles[0]._id).send({ name: articles[1].name})
    //     .end((err, res) => {
    //         res.should.have.status(405)
    //         done()
    //     })
    // })

})

describe("PUT - /articles", () => {
    it("Modifier plusieurs articles. - S", (done) => {
        chai.request(server).put('/articles').query({id: _.map(articles, '_id')}).send({ name: "lucas" })
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })

    it("Modifier plusieurs articles avec des ids invalide. - E", (done) => {
        chai.request(server).put('/articles').query({id: ['267428142', '41452828']}).send({name: "Olivier"})
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })

    it("Modifier plusieurs articles avec des ids inexistant. - E", (done) => {
        chai.request(server).put('/articles').query({id: ['66791a552b38d88d8c6e9ee7', '667980886db560087464d3a7']})
        .send({name: "Olivier"})
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })

    it("Modifier des articles avec un champ requis vide. - E", (done) => {
        chai.request(server).put('/articles').query({id: _.map(articles, '_id')}).send({ name: ""})
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })

    // it("Modifier des articles avec un champ unique existant. - E", (done) => {
    //     chai.request(server).put('/articles').query({id: _.map(articles, '_id')}).send({ name: articles[1].name})
    //     .end((err, res) => {
    //         res.should.have.status(405)
    //         done()
    //     })
    // })
})

describe("DELETE - /article", () => {
    it("Supprimer un article. - S", (done) => {
        chai.request(server).delete('/article/' + articles[0]._id)
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
    it("Supprimer un article incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/article/665f18739d3e172be5daf092')
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })
    it("Supprimer un article incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/article/123')
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe("DELETE - /articles", () => {
    it("Supprimer plusieurs articles. - S", (done) => {
        chai.request(server).delete('/articles').query({id: _.map(articles, '_id')})
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
    it("Supprimer plusieurs articles incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/articles/665f18739d3e172be5daf092&665f18739d3e172be5daf093')
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })
    it("Supprimer plusieurs articles incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/articles').query({id: ['123', '456']})
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})


it("Suppression des utilisateurs fictifs", (done) => {
    UserService.deleteManyUsers(tab_id_users, null, function(err, value){
        done()
    })
})