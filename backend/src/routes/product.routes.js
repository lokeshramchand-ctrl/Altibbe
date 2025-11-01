const express = require("express");
const Product = require("../models/product.model");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Create Product (company-specific)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    const companyId = req.user.companyId;
    const product = await Product.create({ name, description, companyId });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get products for company
router.get("/", authMiddleware, async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const products = await Product.find({ companyId });
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
