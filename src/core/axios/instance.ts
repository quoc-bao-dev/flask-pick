import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://api-happyland.flashpick.vn/",
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
});
