import express from 'express';
import Product from '../models/productModel.js';

// Creating a new router instance
const productsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       500:
 *         description: Error getting products
 */
const getProducts = async (req, res) => {
  try {
    // Fetching all products from the database
    const products = await Product.find();
    // Sending the retrieved products as a response
    res.json(products);
  } catch (error) {
    // Sending a 500 response if an error occurs during retrieval
    res.status(500).json({ message: 'Error getting products', error });
  }
};

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search for products by a query
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query
 *     responses:
 *       200:
 *         description: Filtered products retrieved successfully
 *       500:
 *         description: Error searching products
 */
const searchProducts = async (req, res) => {
  // Extracting the search query from the request query parameters
  const { query } = req.query;

  try {
    // Fetching products from the database that match the query
    const filteredProducts = await Product.find({
      title: { $regex: new RegExp(`^${query}`, 'i') },
    });
    // Sending the filtered products as a response
    res.json(filteredProducts);
  } catch (error) {
    // Sending a 500 response if an error occurs during search
    res.status(500).json({ message: 'Error searching products', error });
  }
};

// Route to handle retrieving all products
productsRouter.get('/', getProducts);

// Route to handle searching for products based on a query
productsRouter.get('/search', searchProducts);

// Exporting the router instance
export default productsRouter;

