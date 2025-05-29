import axios from 'axios';

const API = axios.create({
  baseURL: "https://wheelie-backend.onrender.com",
  withCredentials: true, // only needed if you're using cookies or sessions
});

export default API;
