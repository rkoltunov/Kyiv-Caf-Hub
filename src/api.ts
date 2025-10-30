import axios from "axios";
import { useStore } from "./app/store";

const api = axios.create({
  baseURL: "/api/",
  withCredentials: true,
});

// ✅ Проверка, истёк ли токен (если есть exp)
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

api.interceptors.request.use((config) => {
  const token = useStore.getState().token;

  if (token && config.headers && !config.url?.includes("/auth/login")) {
    if (isTokenExpired(token)) {
      console.warn("⏰ Token expired — logging out...");
      useStore.getState().logout();
      window.location.href = "/admin/login";
      throw new axios.Cancel("Token expired");
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("👉 Отправка запроса:", config.url, config.data, "Token:", token);
  return config;
});

// ✅ Перехватываем 401 и разлогиниваем
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("🚫 Unauthorized — redirecting to login");
      useStore.getState().logout();
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;
