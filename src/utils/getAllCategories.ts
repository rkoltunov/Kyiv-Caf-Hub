import api from "../api"; // если твой axios инстанс называется api
import { useStore } from "../app/store";
import type { CategoryResponseDto } from "../types/dto";

/**
 * ⚡ Загружает все категории по известным ID
 * эмулирует GET /category/all (которого нет на бэке)
 */
export async function getAllCategories(ids: number[]): Promise<CategoryResponseDto[]> {
  const token = useStore.getState().token;
  const headers = { Authorization: `Bearer ${token}` };

  const results: CategoryResponseDto[] = [];

  for (const id of ids) {
    try {
      const res = await api.get(`/category/${id}`, { headers });
      results.push(res.data);
    } catch (err) {
      console.warn(`⚠️ Не удалось получить категорию id=${id}`, err);
    }
  }

  return results;
}
