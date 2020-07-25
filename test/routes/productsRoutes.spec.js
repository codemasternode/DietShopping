import { expect } from 'chai'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../src/index'
import chaiExpectedCookie from 'chai-expected-cookie'
import Products from '../../src/model/products'

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
                res.should.have.status(200);
                res.body.should.have.property("products")
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
                res.body.should.have.property("products")
                expect(res.body.products).to.be.an("array")
                done()
            })
    })
    it("should send array of products paginated on second page", (done) => {
        chai.request(server)
            .post("/api/products/get-products-by-page")
            .send({
                page: 2,
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
    it("should return 200 when search products that are in DB", (done) => {
        chai.request(server)
            .post("/api/products/search-products")
            .send({
                search: "smartphone",
                page: 0
            }).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("products")
                expect(res.body.products).to.be.an("array")
                done()
            })
    })
    it("should return 404 on missing products", (done) => {
        chai.request(server)
            .post("/api/products/search-products")
            .send({
                search: "asdxcxcedsadas12e12e13evwcd",
                page: 0
            }).end((err, res) => {
                res.should.have.status(404);
                done()
            })
    })
    it("should return 400 on missing search parameter", (done) => {
        chai.request(server)
            .post("/api/products/search-products")
            .send({ page: 2 }).end((err, res) => {
                res.should.have.status(400);
                done()
            })
    })
    it("should return 400 on missing page parameter", (done) => {
        chai.request(server)
            .post("/api/products/search-products")
            .send({ search: "ads" }).end((err, res) => {
                res.should.have.status(400);
                done()
            })
    })
})

describe("test /api/products/create", () => {

})

describe("test /api/products/update", () => {

})

describe("test /api/products/delete", () => {

})