import { expect } from 'chai'
import mongodbConnection from "../../src/config/db"
import Products from '../../src/model/products'
import uniqid from 'uniqid'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../src/index'
import chaiExpectedCookie from 'chai-expected-cookie'
import { loadDataFromJSONFile } from '../../src/services/loadData'

let should = chai.should();

chai.use(chaiHttp)
chai.use(chaiExpectedCookie)

describe("test /api/products/get-products-by-page", () => {
    it("should send array of products", (done) => {
        chai.request(server)
            .post("/api/products/get-products-by-page")
            .send({
                page: 1,
                sort: "created_at"
            }).end((err, res) => {
                console.log(res.body)
                res.should.have.status(200);
                res.should.have.property("products")
                expect(res.body.products).to.be.an("array")
                done()
            })
    })
    it("should send array of products paginated on first page", (done) => {
        chai.request(server)
            .post("/api/products/get-products-by-page")
            .send({
                page: 1,
                sort: "created_at"
            }).end((err, res) => {
                res.should.have.status(200);
                res.should.have.property("products")
                expect(res.body.products).to.be.an("array")
                done()
            })
    })
    it("should send array of products paginated on third page", (done) => {
        chai.request(server)
            .post("/api/products/get-products-by-page")
            .send({
                page: 1,
                sort: "created_at"
            }).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("products")
                expect(res.body.products).to.be.an("array")
                done()
            })
    })
    it("should return 404 on paginated page out of range", (done) => {
        chai.request(server)
            .post("/api/products/get-products-by-page")
            .send({
                page: 200,
                sort: "created_at"
            }).end((err, res) => {
                res.should.have.status(404);
                done()
            })
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