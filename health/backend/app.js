import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import authRouter from './routes/authRouter.js';
import productsRouter from './routes/productsRouter.js';
import caloriesRouter from './routes/caloriesRouter.js';
import eatenProductsRouter from './routes/eatenProductsRouter.js';
// import dayRouter from './routes/day.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'HEALTH-APP API',
      version: '1.0.0',
      description: 'API documentation for the HEALTH-APP'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`
      }
    ]
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Log requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRouter); // Adjusted path for authentication
app.use('/api/products', productsRouter); // Router for products
app.use('/api/calories', caloriesRouter); // Router for calories
app.use('/api/eaten-products', eatenProductsRouter); // Router for eaten products

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default app;
