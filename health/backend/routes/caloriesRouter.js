import express from 'express';
import Product from '../models/productModel.js';
import DailyRate from '../models/dailyRate.js';
import authMiddleware from '../middleware/auth.js';

const caloriesRouter = express.Router();

/**
 * @swagger
 * /calories/public:
 *   post:
 *     summary: Calculate daily calorie intake for public users
 *     tags: [Calories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - height
 *               - weight
 *               - age
 *               - desiredWeight
 *               - bloodType
 *             properties:
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *               age:
 *                 type: number
 *               desiredWeight:
 *                 type: number
 *               bloodType:
 *                 type: number
 *     responses:
 *       200:
 *         description: Daily calorie intake calculated successfully
 *       500:
 *         description: Error calculating daily intake
 */
const calculateDailyRate = async (req, res) => {
  const { height, weight, age, desiredWeight, bloodType } = req.body;

  const BMR = 10 * weight + 6.25 * height - 5 * age;

  const weightDifference = weight - desiredWeight;
  const adjustmentFactor = weightDifference * 0.1;
  const dailyRateCalc = BMR - adjustmentFactor;

  try {
    const products = await Product.find();
    const notRecommendedProducts = products
      .filter((product) => product.groupBloodNotAllowed[bloodType])
      .map((product) => product.title);

    // If the user is authenticated, save or update the daily rate and not recommended products in the database
    if (req.user) {
      const dailyRateEntry = await DailyRate.findOneAndUpdate(
        { userId: req.user.id },
        {
          userId: req.user.id,
          dailyRate: dailyRateCalc,
          notRecommendedProducts,
        },
        { new: true, upsert: true }
      );
      res.json(dailyRateEntry);
    } else {
      res.json({ dailyRate: dailyRateCalc, notRecommendedProducts });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error calculating daily intake', error });
  }
};

/**
 * @swagger
 * /calories/user:
 *   post:
 *     summary: Calculate daily calorie intake for authenticated users
 *     tags: [Calories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - height
 *               - weight
 *               - age
 *               - desiredWeight
 *               - bloodType
 *             properties:
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *               age:
 *                 type: number
 *               desiredWeight:
 *                 type: number
 *               bloodType:
 *                 type: number
 *     responses:
 *       200:
 *         description: Daily calorie intake calculated successfully
 *       500:
 *         description: Error calculating daily intake
 */
caloriesRouter.post('/user', authMiddleware, calculateDailyRate);

/**
 * @swagger
 * /calories/user/daily-rate:
 *   get:
 *     summary: Get daily rate for authenticated user
 *     tags: [Calories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily rate retrieved successfully
 *       404:
 *         description: Daily rate not found
 *       500:
 *         description: Error retrieving daily rate
 */
const getUserDailyRate = async (req, res) => {
  const userId = req.user.id;

  try {
    console.log('Fetching daily rate for user:', userId);
    const dailyRate = await DailyRate.findOne({ userId });
    if (dailyRate) {
      res.status(200).json(dailyRate);
    } else {
      res.status(404).json({ message: 'Daily rate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving daily rate', error });
  }
};

caloriesRouter.get('/user/daily-rate', authMiddleware, getUserDailyRate);

export default caloriesRouter;


