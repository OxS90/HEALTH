import api from './api';

export const registerUser = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const updateUser = async (profileData) => {
  const response = await api.post('/auth/updateUser', profileData);
  return response.data;
};

export const refreshAccessToken = async (refreshToken) => {
  const response = await api.post('/auth/refreshToken', { token: refreshToken });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/user');
  return response.data;
};
