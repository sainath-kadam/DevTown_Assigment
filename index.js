const express = require('express');
const connectDB = require('./Config/db'); // Import your database connection
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Import Routes
const productsRouter = require('./routes/products');

// Use Routes
app.use('/products', productsRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
