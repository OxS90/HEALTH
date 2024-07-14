import mongoose from 'mongoose';

const eatenProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    ref: 'Product',
    required: true,
  },
  productTitle: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
});

const EatenProduct = mongoose.model('EatenProduct', eatenProductSchema);

export default EatenProduct;
