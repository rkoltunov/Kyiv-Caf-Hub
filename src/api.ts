const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// пример запроса
export async function getCafes() {
  const response = await fetch(`${API_URL}/cafes`);
  if (!response.ok) throw new Error("Ошибка при получении данных");
  return await response.json();
}