import axios from 'axios';
const BASE_URL = 'http://localhost:11000';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});