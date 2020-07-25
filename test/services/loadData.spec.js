import { loadDataFromJSONFile } from '../../src/services/loadData'
import { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chai from 'chai'

chai.use(chaiAsPromised)


describe("test loadDataFromJSONFile", () => {
    it("should return array of objects when load json file with array", (done) => {
        loadDataFromJSONFile("products.json", "../../test/data").then(data => {
            expect(data).to.be.an("array")
            done()
        })
    })
    it("should return object when load json file with object", (done) => {
        loadDataFromJSONFile("admin.json", "../../test/data").then(data => {
            expect(data).to.be.a("object")
            done()
        })
    })
    it("should throw error when call without required parameters", () => {
        expect(() => loadDataFromJSONFile()).to.throw()
    })
    it("should throw error when pass path to missing file", () => {
        expect(loadDataFromJSONFile("dasasdasdasddsaadsasdasd")).to.be.rejectedWith()
    })
})