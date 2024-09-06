import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/projuct.controller.js";

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Add a new product
router.post("/", createProduct);

// Update product
router.put("/:id", updateProduct);

// Delete product by id
router.delete("/:id", deleteProduct);

export default router;