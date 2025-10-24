import api from "../api";
import type { TagRequestDto, TagResponseDto } from  "../types/dto";

// === Получить все теги ===
export const getTags = async (): Promise<TagResponseDto[]> => {
  const { data } = await api.get("/tags");
  return data;
};

// === Создать тег ===
export const createTag = async (dto: TagRequestDto): Promise<TagResponseDto> => {
  const { data } = await api.post("/tags", dto);
  return data;
};

// === Обновить тег ===
export const updateTag = async (id: number, dto: TagRequestDto): Promise<TagResponseDto> => {
  const { data } = await api.put(`/tags/${id}`, dto);
  return data;
};

// === Удалить тег ===
export const deleteTag = async (id: number): Promise<void> => {
  await api.delete(`/tags/${id}`);
};
