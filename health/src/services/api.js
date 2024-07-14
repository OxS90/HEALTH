import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const setToken = (token) => {
  console.log("Setting token:", token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  console.log("Clearing token");
  delete api.defaults.headers.common['Authorization'];
};

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log("Attempting to refresh token with refresh token:", refreshToken);
        const response = await axios.post('http://localhost:5000/api/auth/refreshToken', { token: refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        console.log("New tokens received:", accessToken, newRefreshToken);
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        setToken(accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        console.log("Refresh token failed, logging out.");
        clearToken();
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
