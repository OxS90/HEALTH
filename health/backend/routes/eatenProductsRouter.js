import express from 'express';
import jwt from 'jsonwebtoken';
import EatenProduct from '../models/eatenProduct.js';
import authMiddleware from '../middleware/auth.js';

const eatenProductsRouter = express.Router();

// Function to get userId from token
const getUserIdFromToken = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded.id;
};

/**
 * @swagger
 * tags:
 *   name: Eaten Products
 *   description: Operations related to eaten products
 */

/**
 * @swagger
 * /eaten-products:
 *   post:
 *     summary: Add a new eaten product
 *     tags: [Eaten Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - productId
 *               - productTitle
 *               - weight
 *               - calories
 *             properties:
 *               date:
 *                 type: string
 *               productId:
 *                 type: string
 *               productTitle:
 *                 type: string
 *               weight:
 *                 type: number
 *               calories:
 *                 type: number
 *     responses:
 *       201:
 *         description: Eaten product added successfully
 *       500:
 *         description: Error adding eaten product
 */
const addEatenProduct = async (req, res) => {
  const { date, productId, productTitle, weight, calories } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const userId = getUserIdFromToken(token);

  try {
    const newEatenProduct = new EatenProduct({
      userId,
      date,
      productId,
      productTitle,
      weight,
      calories,
    });
    await newEatenProduct.save();
    res.status(201).json(newEatenProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding eaten product', error });
  }
};

/**
 * @swagger
 * /eaten-products/{id}:
 *   delete:
 *     summary: Delete an eaten product by ID
 *     tags: [Eaten Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The eaten product ID
 *     responses:
 *       200:
 *         description: Eaten product deleted successfully
 *       404:
 *         description: Eaten product not found
 *       500:
 *         description: Error deleting eaten product
 */
const deleteEatenProduct = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  const userId = getUserIdFromToken(token);

  try {
    const result = await EatenProduct.findOneAndDelete({ _id: id, userId });
    if (result) {
      res.status(200).json({ message: 'Eaten product deleted' });
    } else {
      res.status(404).json({ message: 'Eaten product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting eaten product', error });
  }
};

/**
 * @swagger
 * /eaten-products/{date}:
 *   get:
 *     summary: Get eaten products by date
 *     tags: [Eaten Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: The date to filter eaten products
 *     responses:
 *       200:
 *         description: Eaten products retrieved successfully
 *       500:
 *         description: Error fetching eaten products
 */
const getEatenProducts = async (req, res) => {
  const { date } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  const userId = getUserIdFromToken(token);

  try {
    const products = await EatenProduct.find({ userId, date });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching eaten products', error });
  }
};

/**
 * @swagger
 * /eaten-products/day/{date}:
 *   get:
 *     summary: Get day info by date
 *     tags: [Eaten Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: The date to get day info
 *     responses:
 *       200:
 *         description: Day info retrieved successfully
 *       500:
 *         description: Error retrieving day info
 */
const getDayInfo = async (req, res) => {
  const { date } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  const userId = getUserIdFromToken(token);

  try {
    const dayInfo = await EatenProduct.find({ userId, date });
    res.json(dayInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving day info', error });
  }
};

// Apply the authentication middleware to all routes in this router
eatenProductsRouter.use(authMiddleware);

eatenProductsRouter.post('/', addEatenProduct);
eatenProductsRouter.delete('/:id', deleteEatenProduct);
eatenProductsRouter.get('/:date', getEatenProducts);
eatenProductsRouter.get('/day/:date', getDayInfo);

export default eatenProductsRouter;
