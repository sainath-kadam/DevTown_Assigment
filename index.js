// index.js
const express = require('express');
const connectDB = require('./Config/db'); // Import your database connection
const Product = require('./Model/ProductModel'); // Import the Product model
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Endpoint to add a product
app.post('/products', async (req, res) => {
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
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
