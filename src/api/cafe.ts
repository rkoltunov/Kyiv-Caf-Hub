import api from "../api"; // axios instance
import type {
  CafeResponseDto,
  PageCafeResponseDto,
  CafeRequestDto,
  CafeUpdateRequestDto,
} from "../types/dto";

// === Получить список кафе ===
export const getCafes = async (
  page = 0,
  size = 10
): Promise<PageCafeResponseDto> => {
  const { data } = await api.get(`/cafe`, { params: { page, size } });
  return data;
};

// === Получить одно кафе по ID ===
export const getCafeById = async (id: number): Promise<CafeResponseDto> => {
  const { data } = await api.get(`/cafe/${id}`);
  return data;
};

// === Создать новое кафе ===
export const createCafe = async (dto: CafeRequestDto): Promise<CafeResponseDto> => {
  const { data } = await api.post(`/cafe`, dto);
  return data;
};

// === Обновить существующее кафе ===
export const updateCafe = async (
  id: number,
  dto: CafeUpdateRequestDto
): Promise<CafeResponseDto> => {
  const { data } = await api.put(`/cafe/${id}`, dto);
  return data;
};

// === Удалить кафе ===
export const deleteCafe = async (id: number): Promise<void> => {
  await api.delete(`/cafe/${id}`);
};

// === Поиск кафе ===
export const searchCafes = async (query: string): Promise<CafeResponseDto[]> => {
  const { data } = await api.get(`/cafe/search`, { params: { query } });
  return data;
};
