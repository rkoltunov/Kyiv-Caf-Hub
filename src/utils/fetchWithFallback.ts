// Универсальная утилита: выполняем apiFetch(), а если ошибка — fallbackData
export async function fetchWithFallback<T>(
  apiFetch: () => Promise<T>,
  fallbackData: T
): Promise<T> {
  try {
    const res = await apiFetch();
    // Если backend вернул валидный контент
    if (Array.isArray(res) && res.length > 0) return res;
    // Если backend вернул пусто → используем моки
    if (Array.isArray(res) && res.length === 0) {
      console.warn("⚠️ Backend returned empty array → using fallback");
      return fallbackData;
    }
    return res ?? fallbackData;
  } catch (err) {
    console.warn("❌ Backend failed → using fallback", err);
    return fallbackData;
  }
}
