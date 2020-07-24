import { expect } from 'chai'
import mongodbConnection from "../../src/config/db"
import User from '../../src/model/users'
import uniqid from 'uniqid'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../src/index'

describe("test /api/products/get-products-by-page", () => {
    it("should send array of products", (done) => {
        
    })
    it("should send array of products paginated on first page", (done) => {

    })
    it("should send array of products paginated on third page", (done) => {

    })
    it("should return 404 on paginated page out of range", (done) => {

    })
})

describe("test /api/products/search", () => {

})

describe("test /api/products/create", () => {

})

describe("test /api/products/update", () => {

})

describe("test /api/products/delete", () => {

})