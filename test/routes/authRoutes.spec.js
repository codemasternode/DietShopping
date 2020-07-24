import { expect } from 'chai'
import mongodbConnection from "../../src/config/db"
import User from '../../src/model/users'
import uniqid from 'uniqid'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../src/index'
import chaiExpectedCookie from 'chai-expected-cookie'

let should = chai.should();

chai.use(chaiHttp)
chai.use(chaiExpectedCookie)

describe("test /api/auth/login", () => {
    before((done) => {
        mongodbConnection(async () => {
            const user = await User.create({
                name: "Marcin",
                surname: "Warzybok",
                phone: "563123123",
                email: "marcinwarzybok@outlook.com",
                password: "ABCDEFGH",
                isConfirmed: true,
                address_details: {
                    street: "Bieżanowska",
                    houseNumber: "258B",
                    state: "Małapolska"
                },
                confirmCode: uniqid()
            })
            const user2 = await User.create({
                name: "Marcin",
                surname: "Warzybok",
                phone: "563123123",
                email: "marcinwarzybok2@outlook.com",
                password: "ABCDEFGH",
                isConfirmed: false,
                address_details: {
                    street: "Bieżanowska",
                    houseNumber: "258B",
                    state: "Małapolska"
                },
                confirmCode: uniqid()
            })
            done()
        })

    })
    it("should return 200 with cookie when pass correct credentials", (done) => {
        chai.request(server)
            .post("/api/auth/login")
            .send({
                email: "marcinwarzybok@outlook.com",
                password: "ABCDEFGH"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("expiresAt")
                expect(res).to.containCookie({
                    name: "token"
                })
                done()
            })
    })

    it("should return 400 when pass incorrect credentials", (done) => {
        chai.request(server)
            .post("/api/auth/login")
            .send({
                email: "marcinwarzybok@outlook.com",
                password: "ABCDEFGHIJK"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done()
            })
    })

    it("should return 400 when pass missing email", (done) => {
        chai.request(server)
            .post("/api/auth/login")
            .send({
                password: "ABCDEFGH"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done()
            })
    })

    it("should return 400 when pass missing password", (done) => {
        chai.request(server)
            .post("/api/auth/login")
            .send({
                email: "marcinwarzybok@outlook.com",
            })
            .end((err, res) => {
                res.should.have.status(400);
                done()
            })
    })

    it("should return 400 when try to login without confirm account", (done) => {
        chai.request(server)
            .post("/api/auth/login")
            .send({
                email: "marcinwarzybok@outlook.com",
            })
            .end((err, res) => {
                res.should.have.status(400);
                done()
            })
    })

})

describe("test /api/auth/logout", () => {
    it("should return 200", (done) => {
        chai.request(server)
            .post("/api/auth/logout")
            .send({})
            .set("Cookie", "token=xyz")
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })
})
