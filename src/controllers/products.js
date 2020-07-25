import Product from '../model/products'
import { checkIsObjectHasRequiredProperties } from '../services/propertiesHelper'

export async function getProductByPage(req, res) {
    const hasRequiredProperties = checkIsObjectHasRequiredProperties(["sort", "page"], req.body)

    if (!hasRequiredProperties) {
        return res.status(400).send({ msg: "Missing require properties: [sort, page]" })
    }
    const products = await Product.find({}).sort(req.body.sort).skip(req.body.page).limit(10)
    if (products.length === 0) {
        return res.status(404).send({ msg: "Page number out of range" })
    }

    res.send({ products })
}

export async function searchProducts(req, res) {
    const hasRequiredProperties = checkIsObjectHasRequiredProperties(["search", "page"], req.body)
    if (!hasRequiredProperties) {
        return res.status(400).send({ msg: "Missing require properties: [search, page]" })
    }
    const products = await Product.find({ $text: { $search: req.body.search } }).sort(req.body.sort).skip(req.body.page).limit(10)
    console.log(products)
    if (products.length === 0) {
        return res.status(404).send({ msg: "Product not found" })
    }
    res.send({ products })
}