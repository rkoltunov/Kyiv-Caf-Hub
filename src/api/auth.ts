import api from "../api";

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  // ожидаем, что бэкенд вернёт { token: "..." } или просто token
  // возвращаем объект целиком, чтобы компонент обработал
  return res.data;
}

export async function logout() {
  // если бэкенд поддерживает /logout
  try {
    await api.post("/auth/logout");
  } catch {
    // игнорируем ошибки
  }
}