import express from "express";
import { getProductByPage, searchProducts, createProduct } from "../controllers/products";
import { verifyToken } from '../middlewares/auth'

const router = express.Router();

export default () => {
    router.post("/get-products-by-page", getProductByPage);
    router.post("/search-products", searchProducts)
    router.post("/create", verifyToken, createProduct)
    return router;
};