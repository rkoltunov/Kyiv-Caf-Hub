import axios from "axios";
import { useStore } from "./app/store";

export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

const api = axios.create({
  baseURL: USE_MOCKS ? "" : "/api/",
  withCredentials: true,
});

// === Проверка, истёк ли токен ===
function isTokenExpired(token: string): boolean {
  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    if (!payload.exp) return false;
    const now = Date.now() / 1000;
    return payload.exp < now;
  } catch {
    return true;
  }
}

// === Request Interceptor ===
api.interceptors.request.use((config) => {
  // 🟡 Если режим моков — НЕ добавляем токен и НЕ делаем backend запросы
  if (USE_MOCKS) {
    return config; 
  }

  const token = useStore.getState().token;

  if (token && config.headers && !config.url?.includes("/auth/login")) {
    if (isTokenExpired(token)) {
      console.warn("⏰ Token expired — clearing token...");
      useStore.getState().logout();

      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }

      throw new axios.Cancel("Token expired");
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// === Response Interceptor ===
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // 🟡 Если моки — НЕ обрабатываем 401
    if (USE_MOCKS) return Promise.reject(error);

    if (error.response?.status === 401) {
      console.warn("🚫 Unauthorized — clearing token");
      useStore.getState().logout();

      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
