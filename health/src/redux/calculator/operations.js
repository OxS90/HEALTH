import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

export const calculatePublicDailyRate = createAsyncThunk(
  'calculator/calculatePublicDailyRate',
  async (data, thunkAPI) => {
    try {
      const response = await api.post('/calories/public', data);
      return response.data;
    } catch (error) {
      toast.error('Error calculating daily intake');
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const calculateUserDailyRate = createAsyncThunk(
  'calculator/calculateUserDailyRate',
  async (data, thunkAPI) => {
    try {
      const response = await api.post('/calories/user', data);
      return response.data;
    } catch (error) {
      toast.error('Error calculating daily intake');
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserDailyRate = createAsyncThunk(
  'calculator/getUserDailyRate',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/calories/user/daily-rate');
      return response.data;
    } catch (error) {
      toast.error('Error retrieving daily rate');
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
