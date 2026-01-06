import {
  getCafeById as getCafeByIdReal,
  getCafes as getCafesReal,
} from "./cafe";
import { cafes as mockCafes } from "../mocks/cafes";
import type { CafeResponseDto, PageCafeResponseDto } from "../types/dto";

// Проверка: является ли ответ корректным JSON объектом
function isValidCafe(obj: any): boolean {
  return obj && typeof obj === "object" && "id" in obj && "name" in obj;
}

// === Получить список кафе ===
export const getCafes = async (
  page = 0,
  size = 10
): Promise<PageCafeResponseDto> => {
  try {
    const data = await getCafesReal(page, size);

    // Если backend вернул HTML → это строка
    if (typeof data === "string") throw new Error("HTML instead of JSON");

    if (!data || !Array.isArray(data.content)) {
      throw new Error("Invalid backend response");
    }

    return data;
  } catch (err) {
    console.warn("⚠️ Backend недоступен → используем моки");

    // эмулируем пагинацию
    const start = page * size;
    const end = start + size;
    const content = mockCafes.slice(start, end);

    return {
      content,
      totalElements: mockCafes.length,
      totalPages: Math.ceil(mockCafes.length / size),
      size,
      number: page,
      first: page === 0,
      last: end >= mockCafes.length,
      empty: content.length === 0,
      pageable: {
        offset: 0,
        pageNumber: page,
        pageSize: size,
        unpaged: false,
        paged: true,
        sort: [],
      },
      sort: [],
      numberOfElements: content.length,
    };
  }
};

// === Получить одно кафе по ID ===
export const getCafeById = async (id: number): Promise<CafeResponseDto> => {
  try {
    const data = await getCafeByIdReal(id);

    if (typeof data === "string") throw new Error("HTML returned");
    if (!isValidCafe(data)) throw new Error("Invalid data format");

    return data;
  } catch (err) {
    console.warn(`⚠️ Backend недоступен → ищем мок для id=${id}`);

    const mock =
      mockCafes.find((c) => c.id === id) ||
      mockCafes.find((c) => c.slug.includes(String(id))) ||
      mockCafes[0];

    return mock as CafeResponseDto;
  }
};
