import request from 'supertest'
import { expect } from 'chai'
import mongodbConnection from "../../src/config/db"
import User from '../../src/model/users'

describe("test /api/auth/login", () => {
    before((done) => {
        mongodbConnection()
    })
    it("should return 200 with cookie when pass correct credentials", (done) => {

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
