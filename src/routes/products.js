import express from "express";
import { getProductByPage, searchProducts } from "../controllers/products";

const router = express.Router();

export default () => {
    router.post("/get-products-by-page", getProductByPage);
    router.post("/search-products", searchProducts)
    return router;
};