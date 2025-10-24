import api from "../api"; // <- axios instance (у тебя уже есть)
import type {
  CafeResponseDto,
  PageCafeResponseDto,
  CafeRequestDto,
  CafeUpdateRequestDto,
} from "../types/dto";

// === Получить список кафе (с пагинацией) ===
export const getCafes = async (page = 0, size = 10): Promise<PageCafeResponseDto> => {
  const { data } = await api.get(`/cafes`, { params: { page, size } });
  return data;
};

// === Получить одно кафе по slug ===
export const getCafeBySlug = async (slug: string): Promise<CafeResponseDto> => {
  const { data } = await api.get(`/cafes/${slug}`);
  return data;
};

// === Создать новое кафе ===
export const createCafe = async (dto: CafeRequestDto): Promise<CafeResponseDto> => {
  const { data } = await api.post(`/cafes`, dto);
  return data;
};

// === Обновить существующее кафе ===
export const updateCafe = async (id: number, dto: CafeUpdateRequestDto): Promise<CafeResponseDto> => {
  const { data } = await api.put(`/cafes/${id}`, dto);
  return data;
};

// === Удалить кафе ===
export const deleteCafe = async (id: number): Promise<void> => {
  await api.delete(`/cafes/${id}`);
};
