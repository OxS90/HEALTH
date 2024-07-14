import mongoose from "mongoose";

const dailyRateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dailyRate: {
    type: Number,
    required: true,
  },
  notRecommendedProducts: {
    type: [String],
    required: true,
  },
});

const DailyRate = mongoose.model("DailyRate", dailyRateSchema);

export default DailyRate;