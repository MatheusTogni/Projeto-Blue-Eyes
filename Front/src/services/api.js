import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blue-eyes-back.vercel.app', 
});

export default api;
