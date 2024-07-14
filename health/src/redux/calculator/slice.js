import { createSlice } from '@reduxjs/toolkit';
import { calculatePublicDailyRate, calculateUserDailyRate, getUserDailyRate } from './operations';

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    dailyRate: null,
    notRecommendedProducts: [],
    error: null,
    isLoading: false, // Add loading state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculatePublicDailyRate.pending, (state) => {
        state.isLoading = true; // Set loading to true when a request is pending
      })
      .addCase(calculatePublicDailyRate.fulfilled, (state, action) => {
        state.dailyRate = action.payload.dailyRate;
        state.notRecommendedProducts = action.payload.notRecommendedProducts;
        state.isLoading = false; // Set loading to false when a request is fulfilled
      })
      .addCase(calculateUserDailyRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(calculateUserDailyRate.fulfilled, (state, action) => {
        state.dailyRate = action.payload.dailyRate;
        state.notRecommendedProducts = action.payload.notRecommendedProducts;
        state.isLoading = false;
      })
      .addCase(getUserDailyRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDailyRate.fulfilled, (state, action) => {
        state.dailyRate = action.payload.dailyRate;
        state.notRecommendedProducts = action.payload.notRecommendedProducts;
        state.isLoading = false;
      })
      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export default calculatorSlice.reducer;
