import {
  getCafeById as getCafeByIdReal,
  getCafes as getCafesReal,
} from "./cafe";
import { cafes as mockCafes } from "../mocks/cafes";
import type { CafeResponseDto, PageCafeResponseDto } from "../types/dto";

const isProd = import.meta.env.PROD;

// === Получить список кафе ===
export const getCafes = async (
  page = 0,
  size = 10
): Promise<PageCafeResponseDto> => {
  if (isProd) {
    console.warn("⚠️ Using mock cafes list (no backend in production)");
    // эмулируем пагинацию на моках
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
      pageable: { offset: 0, sort: [], unpaged: false, paged: true, pageNumber: page, pageSize: size },
      sort: [],
      numberOfElements: content.length,
    };
  }

  // локально — реальный backend
  return getCafesReal(page, size);
};

// === Получить одно кафе по ID ===
export const getCafeById = async (id: number): Promise<CafeResponseDto> => {
  if (isProd) {
    console.warn("⚠️ Using mock cafe (no backend in production)");
    const mock = mockCafes.find((c) => c.id === id) || mockCafes[0];
    return mock as CafeResponseDto;
  }

  return getCafeByIdReal(id);
};
