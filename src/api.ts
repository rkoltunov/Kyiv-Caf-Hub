import axios from "axios";
import { useStore } from "./app/store";

const api = axios.create({
  baseURL: "/api/",
  withCredentials: true, // можно оставить, не мешает даже при localStorage-схеме
});

api.interceptors.request.use((config) => {
  const token = useStore.getState().token; // читаем напрямую из стора
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;