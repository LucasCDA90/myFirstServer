const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('./../../server')
let should = chai.should();
const _ = require('lodash')

var users = []

chai.use(chaiHttp)


describe("POST - /user", () => {
    it("Ajouter un utilisateur. - S", (done) => {
        chai.request(server).post('/user').send({
            firstName: "luf",
            lastName: "Us",
            username: "dwarfSlayer",
            email: "lutfu.us@gmail.com"
        }).end((err, res) => {
            expect(res).to.have.status(201)
            users.push(res.body)
            done()
        });
    })
    it("Ajouter un utilisateur incorrect. (Sans firstName) - E", (done) => {
        chai.request(server).post('/user').send({
            lastName: 'Us',
            username: 'dwarfSlayr',
            email: 'lutfu.us@gmil.com'
        }).end((err, res) => {
            expect(res).to.have.status(405)
            done()
        })
    })
    it("Ajouter un utilisateur incorrect. (Avec un username existant) - E", (done) => {
        chai.request(server).post('/user').send({
            firstName: "luf",
            lastName: "Us",
            username: "dwarfSlayer",
            email: "lutfu.us@gmai.com"
        }).end((err, res) => {
            expect(res).to.have.status(405)
            done()
        })
    })
    it("Ajouter un utilisateur incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/user').send({
            firstName: "luffu",
            lastName: "",
            username: "dwarfSlaye",
            email: "lufu.us@gmai.com"
        }).end((err, res) => {
            expect(res).to.have.status(405)
            done()
        })
    })
})

describe("GET - /user", () => {
    it("Chercher un utilisateur correct. - S", (done) => {
        chai.request(server).get('/user/' + users[0]._id)
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })

    it("Chercher un utilisateur incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).get('/user/665f18739d3e172be5daf092')
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })

    it("Chercher un utilisateur incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).get('/user/123')
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    
})

describe("GET - /users", () => {
    it("Chercher plusieurs utilisateurs. - S", (done) => {
        chai.request(server).get('/users').query({id: _.map(users, '_id')})
        .end((err, res) => {
            res.should.have.status(201)
            done()
        })
    })
    it("Chercher plusieurs utilisateurs incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).get('/users/667572d6071b7aee7e31ed7c')
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })
    it("Chercher plusieurs utilisateurs incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).get('/users').query({id: ['123', '456']})
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})




//---------------------------------------------------
/* describe("DELETE - /user", () => {
    it("Supprimer un utilisateur. - S", (done) => {
        chai.request(server).delete('/user/' + users[0]._id)
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
    it("supprimer un utilisateur incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/user/665f18739d3e172be5daf092')
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })
    it("supprimer un utilisateur incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/user/123')
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe("DELETE - /users", () => {
    it("Supprimer plusieurs utilisateurs. - S", (done) => {
        chai.request(server).delete('/users').query({id: _.map(users, '_id')})
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
    it("Supprimer plusieurs utilisateurs incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/users/665f18739d3e172be5daf092&665f18739d3e172be5daf093')
        .end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })
    it("Supprimer plusieurs utilisateurs incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/users').query({id: ['123', '456']})
        .end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
}) */
//-----------------------------------------------------------------------------------
/* describe("DELETE - /users", () => {
    it ("Supprimer plusieurs utilisateurs existants. - S", (done) => {
        chai.request(server).delete('/users').send([{
            firstName: "luf",
            lastName: "Us",
            username: "dwathttvrfSlayer",
            email: "lutfgfbu.us@gmail.com"
        },

        {
            firstName: "luf",
            lastName: "Us",
            username: "dwgfbarfSlayer",
            email: "lutgbffu.us@gmail.com"
        }]).end((err, res) => {
            expect(res).to.have.status(201)
            users.push(res.body)
            done()
        });
    })

    it ("Supprimer plusieurs utilisateurs inexistants. - E", (done) => {        
        chai.request(server).delete('/users').send({
            firstName: "luf",
            lastName: "Us",
            username: "dwarfSlayer",
            email: "lutfu.us@gmail.com"
        }).end((err, res) => {
            expect(res).to.have.status(405)
            users.push(res.body)
            done()
        });
    
    })
}) */