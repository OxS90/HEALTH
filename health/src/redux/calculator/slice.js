import { createSlice } from '@reduxjs/toolkit';
import { calculatePublicDailyRate, calculateUserDailyRate, getUserDailyRate } from './operations';

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    dailyRate: null,
    notRecommendedProducts: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculatePublicDailyRate.fulfilled, (state, action) => {
        state.dailyRate = action.payload.dailyRate;
        state.notRecommendedProducts = action.payload.notRecommendedProducts;
      })
      .addCase(calculateUserDailyRate.fulfilled, (state, action) => {
        state.dailyRate = action.payload.dailyRate;
        state.notRecommendedProducts = action.payload.notRecommendedProducts;
      })
      .addCase(getUserDailyRate.fulfilled, (state, action) => {
        state.dailyRate = action.payload.dailyRate;
        state.notRecommendedProducts = action.payload.notRecommendedProducts;
      })
      .addCase(calculatePublicDailyRate.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(calculateUserDailyRate.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getUserDailyRate.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default calculatorSlice.reducer;
