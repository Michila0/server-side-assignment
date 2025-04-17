import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true,
});

// Auth endpoints
export const register = (data) => api.post('/register', data);
export const login = (data) => api.post('/login', data);

// Country endpoints
export const getCountries = (apiKey) =>
    api.get('/countries', { headers: { 'x-api-key': apiKey } });

export const filterCountry = (name, apiKey) =>
    api.post('/countries/filter', { name }, { headers: { 'x-api-key': apiKey } });

// Admin endpoints
export const changeRole = (data) => api.put('/admin/role', data);
export const deleteUser = (data) => api.delete('/admin/delete', { data });
export const getUsageStats = () => api.get('/admin/usage');
export const getAllUsers = () => api.get('/admin/users');

export default api;