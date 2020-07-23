import { expect } from 'chai'
import mongodbConnection from "../../src/config/db"
import User from '../../src/model/users'
import uniqid from 'uniqid'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../src/index'
import chaiExpectedCookie from 'chai-expected-cookie'

chai.use(chaiHttp)
chai.use(chaiExpectedCookie)

describe("test /api/auth/login", () => {
    before((done) => {
        mongodbConnection(async () => {
            await User.create({
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
                expect(res).to.containCookie({
                    name: "token",
                    attrs: {
                        httpOnly: true,
                        secure: false
                    }
                })
            })
    })

    it("should return 400 when pass incorrect credentials", (done) => {

    })

    it("should return 400 when pass missing email", (done) => {

    })

    it("should return 400 when pass missing password", (done) => {

    })

    it("should return 400 when try to login without confirm account", (done) => {

    })

})

describe("test /api/auth/logout", () => {
    it("should return 200", (done) => {

    })
})
