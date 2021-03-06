import { expect } from 'chai'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../src/index'
import chaiExpectedCookie from 'chai-expected-cookie'
import Products from '../../src/model/products'
import jwt from 'jsonwebtoken'
import uniqid from 'uniqid'

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
    it("should return 200 when all requirements are satisfied", (done) => {
        chai.request(server)
            .post("/api/products/create")
            .set("Cookie", `token=${jwt.sign({ email: "marcinwarzybok@outlook.com" }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            })}`)
            .send({
                name: "Apple Iphone 11 Pro 64GB Space Gray",
                category: "smartphone",
                price: 4699,
                inMagazine: {
                    blocked: 0,
                    inStock: 40
                },
                shortDescription: "Odkryj wszystkie zalety iPhone 11 Pro 512 GB Silver. Smartfona, który zawstydza podkręconą wydajnością. Posiada bowiem najszybszy w historii procesor A13 Bionic oraz baterię, która pozwala na wiele. Weź iPhone 11 Pro do ręki i rób zdjęcia, których nie powstydziłby się nawet profesjonalista. Teraz masz do tego odpowiednie narzędzie – nowy iPhone 11 Pro posiada potrójny aparat główny, działający w oparciu o uczenie maszynowe. Efekty swojej fotograficznej przygody wraz z najmniejszymi detalami możesz ocenić z kolei na olśniewającym ekranie Super Retina XDR.",
                images: [
                    {
                        order: 1,
                        src: ""
                    }
                ],
            }).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("product")
                Products.findById(res.body.product._id).then(product => {
                    expect(product).to.be.a("object")
                    done()
                })

            })
    })
    describe("should return 400 when", () => {
        it("should return 400 when name parameter is missing", (done) => {
            chai.request(server)
                .post("/api/products/create")
                .set("Cookie", `token=${jwt.sign({ email: "marcinwarzybok@outlook.com" }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })}`)
                .send({
                    category: "smartphone",
                    price: 4699,
                    inMagazine: {
                        blocked: 0,
                        inStock: 40
                    },
                    shortDescription: "Odkryj wszystkie zalety iPhone 11 Pro 512 GB Silver. Smartfona, który zawstydza podkręconą wydajnością. Posiada bowiem najszybszy w historii procesor A13 Bionic oraz baterię, która pozwala na wiele. Weź iPhone 11 Pro do ręki i rób zdjęcia, których nie powstydziłby się nawet profesjonalista. Teraz masz do tego odpowiednie narzędzie – nowy iPhone 11 Pro posiada potrójny aparat główny, działający w oparciu o uczenie maszynowe. Efekty swojej fotograficznej przygody wraz z najmniejszymi detalami możesz ocenić z kolei na olśniewającym ekranie Super Retina XDR.",
                    images: [
                        {
                            order: 1,
                            src: ""
                        }
                    ],
                }).end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property("name")
                    done()
                })
        })
        it("should return 400 when category parameter missing", (done) => {
            chai.request(server)
                .post("/api/products/create")
                .set("Cookie", `token=${jwt.sign({ email: "marcinwarzybok@outlook.com" }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })}`)
                .send({
                    name: "Iphone 10",
                    price: 4699,
                    inMagazine: {
                        blocked: 0,
                        inStock: 40
                    },
                    shortDescription: "Odkryj wszystkie zalety iPhone 11 Pro 512 GB Silver. Smartfona, który zawstydza podkręconą wydajnością. Posiada bowiem najszybszy w historii procesor A13 Bionic oraz baterię, która pozwala na wiele. Weź iPhone 11 Pro do ręki i rób zdjęcia, których nie powstydziłby się nawet profesjonalista. Teraz masz do tego odpowiednie narzędzie – nowy iPhone 11 Pro posiada potrójny aparat główny, działający w oparciu o uczenie maszynowe. Efekty swojej fotograficznej przygody wraz z najmniejszymi detalami możesz ocenić z kolei na olśniewającym ekranie Super Retina XDR.",
                    images: [
                        {
                            order: 1,
                            src: ""
                        }
                    ],
                }).end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property("category")
                    done()
                })
        })
        it("should return 400 when price parameter is missing", (done) => {
            chai.request(server)
                .post("/api/products/create")
                .set("Cookie", `token=${jwt.sign({ email: "marcinwarzybok@outlook.com" }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })}`)
                .send({
                    name: "Iphone 10",
                    category: "GPU",
                    inMagazine: {
                        blocked: 0,
                        inStock: 40
                    },
                    shortDescription: "Odkryj wszystkie zalety iPhone 11 Pro 512 GB Silver. Smartfona, który zawstydza podkręconą wydajnością. Posiada bowiem najszybszy w historii procesor A13 Bionic oraz baterię, która pozwala na wiele. Weź iPhone 11 Pro do ręki i rób zdjęcia, których nie powstydziłby się nawet profesjonalista. Teraz masz do tego odpowiednie narzędzie – nowy iPhone 11 Pro posiada potrójny aparat główny, działający w oparciu o uczenie maszynowe. Efekty swojej fotograficznej przygody wraz z najmniejszymi detalami możesz ocenić z kolei na olśniewającym ekranie Super Retina XDR.",
                    images: [
                        {
                            order: 1,
                            src: ""
                        }
                    ],
                }).end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property("price")
                    done()
                })
        })
        it("should return 400 when shortDescription parameter is missing", (done) => {
            chai.request(server)
                .post("/api/products/create")
                .set("Cookie", `token=${jwt.sign({ email: "marcinwarzybok@outlook.com" }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })}`)
                .send({
                    name: "Iphone 10",
                    category: "GPU",
                    price: 12,
                    inMagazine: {
                        blocked: 0,
                        inStock: 40
                    },
                    images: [
                        {
                            order: 1,
                            src: ""
                        }
                    ],
                }).end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property("shortDescription")
                    done()
                })
        })
    })

    describe("should return 401 when", () => {
        it("send request without authentication cookie", (done) => {
            chai.request(server)
                .post("/api/products/create")
                .send({
                    name: "Apple Iphone 11 Pro 64GB Space Gray",
                    category: "smartphone",
                    price: 4699,
                    inMagazine: {
                        blocked: 0,
                        inStock: 40
                    },
                    shortDescription: "Odkryj wszystkie zalety iPhone 11 Pro 512 GB Silver. Smartfona, który zawstydza podkręconą wydajnością. Posiada bowiem najszybszy w historii procesor A13 Bionic oraz baterię, która pozwala na wiele. Weź iPhone 11 Pro do ręki i rób zdjęcia, których nie powstydziłby się nawet profesjonalista. Teraz masz do tego odpowiednie narzędzie – nowy iPhone 11 Pro posiada potrójny aparat główny, działający w oparciu o uczenie maszynowe. Efekty swojej fotograficznej przygody wraz z najmniejszymi detalami możesz ocenić z kolei na olśniewającym ekranie Super Retina XDR.",
                    images: [
                        {
                            order: 1,
                            src: ""
                        }
                    ],
                }).end((err, res) => {
                    res.should.have.status(401);
                    done()
                })
        })
    })
})

describe("test /api/products/update", () => {
    it("should return 200 when all requirements are satisfied", (done) => {
        const name = uniqid()
        const category = uniqid()
        const price = Math.random(Math.floor() * 2000 + 500)
        Products.find({}).then((products) => {
            const _id = products[0]._id
            chai.request(server)
                .post("/api/products/update")
                .set("Cookie", `token=${jwt.sign({ email: "marcinwarzybok@outlook.com" }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })}`)
                .send({
                    _id,
                    toChange: {
                        name,
                        category,
                        price
                    }
                }).end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("product")
                    Products.findById(res.body.product._id).then(product => {
                        expect(product).to.be.a("object")
                        expect(product.name).to.equal(name)
                        expect(product.category).to.equal(category)
                        expect(product.price).to.equal(price)
                        done()
                    })

                })
        })

    })
    describe("should return 400 when", () => {
        it("send request without parameters to change", (done) => {
            Products.find({}).then((products) => {
                const _id = products[0]._id
                chai.request(server)
                    .post("/api/products/update")
                    .set("Cookie", `token=${jwt.sign({ email: "marcinwarzybok@outlook.com" }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    })}`)
                    .send({
                        _id,
                        toChange: {}
                    }).end((err, res) => {
                        res.should.have.status(400);
                        done()
                    })
            })
        })
        it("send request without _id", (done) => {
            const name = uniqid()
            const category = uniqid()
            const price = Math.random(Math.floor() * 2000 + 500)
            chai.request(server)
                .post("/api/products/update")
                .set("Cookie", `token=${jwt.sign({ email: "marcinwarzybok@outlook.com" }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })}`)
                .send({
                    toChange: {
                        name,
                        category,
                        price
                    }
                }).end((err, res) => {
                    res.should.have.status(400);
                    done()
                })
        })
    })
    describe("should return 401 when", () => {
        it("send request without authentication cookie", (done) => {
            const name = uniqid()
            const category = uniqid()
            const price = Math.random(Math.floor() * 2000 + 500)
            Products.find({}).then((products) => {
                const _id = products[0]._id
                chai.request(server)
                    .post("/api/products/update")
                    .send({
                        _id,
                        toChange: {
                            name,
                            category,
                            price
                        }
                    }).end((err, res) => {
                        res.should.have.status(401);
                        done()
                    })
            })
        })
    })
})

describe("test /api/products/delete", () => {

})