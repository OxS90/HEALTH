import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const calculatePublicDailyRate = createAsyncThunk(
  'calculator/calculatePublicDailyRate',
  async (userData, thunkAPI) => {
    try {
      const response = await api.post('/calories/public', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const calculateUserDailyRate = createAsyncThunk(
  'calculator/calculateUserDailyRate',
  async (userData, thunkAPI) => {
    try {
      const response = await api.post('/calories/user', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserDailyRate = createAsyncThunk(
  'calculator/getUserDailyRate',
  async (_, thunkAPI) => {
    try {
      console.log('Attempting to fetch user daily rate');
      const response = await api.get('/calories/user/daily-rate');
      console.log('User daily rate fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user daily rate:', error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
