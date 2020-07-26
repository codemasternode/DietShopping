import express from "express";
import { getProductByPage, searchProducts,createProduct } from "../controllers/products";

const router = express.Router();

export default () => {
    router.post("/get-products-by-page", getProductByPage);
    router.post("/search-products", searchProducts)
    router.post("/create", createProduct)
    return router;
};