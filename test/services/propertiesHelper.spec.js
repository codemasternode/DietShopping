import { checkIsObjectHasOnlyAllowProperties, checkIsObjectHasRequiredProperties } from '../../src/services/propertiesHelper'
import { expect } from 'chai'

describe("test function checkIsObjectHasRequiredProperties", () => {
    describe("should throw error", () => {
        it("when doesn't pass required parameters", (done) => {
            expect(() => checkIsObjectHasRequiredProperties()).to.throw()
            done()
        })
        it("when arrayOfRequiredProperties is not an array", (done) => {
            expect(() => checkIsObjectHasRequiredProperties({ a: "a" })).to.throw("arrayOfRequiredProperties is an array")
            done()
        })
        it("when objectToCheck is not a object", (done) => {
            expect(() => checkIsObjectHasRequiredProperties(["a"])).to.throw("objectToCheck is a object")
            done()
        })
        it("when arrayOfRequiredProperties is not array with strings only", (done) => {
            expect(() => checkIsObjectHasRequiredProperties(
                [12, { a: "asd" }],
                { a: "a", b: "b", c: "c" }
            )).to.throw("arrayOfRequiredProperties is array with strings only")
            done()
        })
    })
    it("should return true when object has required properties", (done) => {
        expect(checkIsObjectHasRequiredProperties(
            ["a", "b"],
            { a: "a", b: "b", c: "c" }
        )).to.equal(true)
        done()
    })
    it("should return false when object doesn't have required properties", (done) => {
        expect(checkIsObjectHasRequiredProperties(
            ["a", "b"],
            { a: "a", c: "c" }
        )).to.equal(false)
        done()
    })
})


describe("test function checkIsObjectHasOnlyAllowProperties", () => {
    describe("should throw error", () => {
        it("when doesn't pass required parameters", (done) => {
            expect(() => checkIsObjectHasOnlyAllowProperties()).to.throw()
            done()
        })
        it("when arrayOfRequiredProperties is not an array", (done) => {
            expect(() => checkIsObjectHasOnlyAllowProperties({})).to.throw("arrayOfRequiredProperties is no an array")
            done()
        })
        it("when objectToCheck is not a object", (done) => {
            expect(() => checkIsObjectHasOnlyAllowProperties(["asd"], 12)).to.throw("objectToCheck is not a object")
            done()
        })
    })
    
    it("should return false when object has properties that are not allow", (done) => {
        expect(checkIsObjectHasOnlyAllowProperties(["asd"], { "asd": "12", "vc": "12" })).to.equal(false)
        done()
    })
    it("should return true when object has only allow properties", (done) => {
        expect(checkIsObjectHasOnlyAllowProperties(["asd", "b"], { asd: 12, b: 13 })).to.equal(true)
        done()
    })
})