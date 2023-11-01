const express = require('express');
const router = express.Router();
const Product = require('../Model/ProductModel');

// Endpoint to add a product
router.post('/', async (req, res) => {
  const { image, title, description, price } = req.body;
  try {
    const newProduct = new Product({ image, title, description, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint to get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
