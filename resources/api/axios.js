// resources/js/api/axios.js
import axios from 'axios';

console.log('VITE_CRM_URL from env:', import.meta.env.VITE_CRM_URL); // Debug

const api = axios.create({
  baseURL: import.meta.env.VITE_CRM_URL, // No fallback → forces correct config
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  
  const tenant_code = localStorage.getItem('tenant_code');
  if (tenant_code) config.headers['X-Tenant-Code'] = tenant_code;
  
  return config;
});

export default api;