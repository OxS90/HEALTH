import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import authMiddleware from '../middleware/auth.js';

dotenv.config();

const authRouter = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user._id, email: user.email }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const { accessToken, refreshToken } = generateTokens(newUser);

    res.status(201).json({ user: newUser, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials: user not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials: password mismatch' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

authRouter.post('/refreshToken', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Refresh Token is required' });
  }

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid Refresh Token' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid Refresh Token' });
  }
});

authRouter.post('/logout', (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
});

authRouter.get('/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

authRouter.post('/updateUser', authMiddleware, async (req, res) => {
  const { dailyRate, notAllowedProducts } = req.body;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.dailyRate = dailyRate;
    user.notAllowedProducts = notAllowedProducts;
    await user.save();

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        dailyRate: user.dailyRate,
        notAllowedProducts: user.notAllowedProducts,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

export default authRouter;
