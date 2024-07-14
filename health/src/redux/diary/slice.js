// diarySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { addEatenProduct, deleteEatenProduct, getDayInfo, searchProducts } from './operations';

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    date: new Date().toISOString().split('T')[0],
    eatenProducts: [],
    dayInfo: [],
    searchedProducts: [],
    error: null,
    currentPage: 0,
    itemsPerPage: 10,
  },
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEatenProduct.fulfilled, (state, action) => {
        state.eatenProducts.push(action.payload);
      })
      .addCase(deleteEatenProduct.fulfilled, (state, action) => {
        state.eatenProducts = state.eatenProducts.filter(product => product._id !== action.payload);
      })
      .addCase(getDayInfo.fulfilled, (state, action) => {
        state.dayInfo = action.payload;
        state.eatenProducts = action.payload; // Ensure eatenProducts are updated
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchedProducts = action.payload;
      })
      .addCase(addEatenProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteEatenProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getDayInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setDate, setPage } = diarySlice.actions;
export default diarySlice.reducer;
