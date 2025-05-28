import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // only needed if you're using cookies or sessions
});

export default API;
