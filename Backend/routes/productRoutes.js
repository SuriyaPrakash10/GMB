// routes/productRoutes.js
import express from "express";
import { searchProducts, getHome } from "../controllers/productController.js";

const router = express.Router();

router.get("/home", getHome);        // NEW
router.get("/search", searchProducts);

export default router;
