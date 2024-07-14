import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUser as registerService,
  loginUser as loginService,
  logoutUser as logoutService,
  updateUser as updateUserService,
  refreshAccessToken as refreshAccessTokenService,
  getCurrentUser as getCurrentUserService,
} from '../../services/authService';
import { setToken, clearToken } from '../../services/api';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const data = await registerService(name, email, password);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await loginService(email, password);
      setToken(data.accessToken);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await logoutService();
    clearToken();
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateUserProfile = createAsyncThunk(
  'auth/updateUser',
  async (profileData, thunkAPI) => {
    try {
      const data = await updateUserService(profileData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return thunkAPI.rejectWithValue('No refresh token found');
    }
    try {
      const data = await refreshAccessTokenService(refreshToken);
      setToken(data.accessToken);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const data = await getCurrentUserService();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
