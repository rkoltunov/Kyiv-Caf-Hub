import api from "../api";
import type { CategoryRequestDto, CategoryResponseDto } from "../types/dto";

// === Получить все категории ===
export const getCategories = async (): Promise<CategoryResponseDto[]> => {
  const { data } = await api.get("/categories");
  return data;
};

// === Создать категорию ===
export const createCategory = async (dto: CategoryRequestDto): Promise<CategoryResponseDto> => {
  const { data } = await api.post("/categories", dto);
  return data;
};

// === Обновить категорию ===
export const updateCategory = async (id: number, dto: CategoryRequestDto): Promise<CategoryResponseDto> => {
  const { data } = await api.put(`/categories/${id}`, dto);
  return data;
};

// === Удалить категорию ===
export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
