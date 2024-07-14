import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const addEatenProduct = createAsyncThunk('diary/addEatenProduct', async (productData, thunkAPI) => {
  try {
    const response = await api.post('/eaten-products', productData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteEatenProduct = createAsyncThunk(
  'diary/deleteEatenProduct',
  async (eatenProductId, thunkAPI) => {
    try {
      console.log('Sending DELETE request for eaten product ID:', eatenProductId);
      const response = await api.delete(`/eaten-products/${eatenProductId}`);
      console.log('DELETE request successful:', response.data);
      return eatenProductId;
    } catch (error) {
      console.error('Error in DELETE request:', error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const searchProducts = createAsyncThunk('diary/searchProducts', async (query, thunkAPI) => {
  try {
    const response = await api.get(`/products/search?query=${query}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getDayInfo = createAsyncThunk('diary/getDayInfo', async (date, thunkAPI) => {
  try {
    const response = await api.get(`/eaten-products/day/${date}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getEatenProductsByDate = createAsyncThunk(
  'diary/getEatenProductsByDate',
  async ({ date }, thunkAPI) => {
    try {
      const response = await api.get(`/eaten-products/${date}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
