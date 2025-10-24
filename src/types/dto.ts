// ===============================
// 📦 Global DTO Types
// ===============================

// === Image ===
export type ImageResponseDto = {
  id: number;
  imageUrl: string;
  altText: string;
};

// === Tag ===
export type TagRequestDto = {
  name: string;
  slug: string;
  tagCategory: "METRO" | "VIBE" | "MENU" | "ACCESSIBILITY" | "BUDGET" | "OTHER";
};

export type TagResponseDto = {
  id: number;
  name: string;
  slug: string;
  category: "METRO" | "VIBE" | "MENU" | "ACCESSIBILITY" | "BUDGET" | "OTHER";
};

// === Category ===
export type CategoryRequestDto = {
  name: string;
};

export type CategoryResponseDto = {
  id: number;
  name: string;
};

// ===============================
// ☕ Cafe DTO
// ===============================
export type CafeRequestDto = {
  excerpt: string;
  description: string;
  name: string;
  slug: string;
  address: string;
  latitude: number;
  longitude: number;
  hours: {
    weekdays: string;
    weekend: string;
  };
  tagIds?: number[];
  imageIds?: number[];
};

export type CafeUpdateRequestDto = {
  excerpt?: string;
  description?: string;
  name?: string;
  slug?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  hours?: {
    weekdays: string;
    weekend: string;
  };
  tagsIds?: number[];
  images?: {
    imageUrl: string;
    altText: string;
  }[];
};

export type CafeResponseDto = {
  id: number;
  excerpt: string;
  description: string;
  name: string;
  slug: string;
  address: string;
  latitude: number;
  longitude: number;
  hours: {
    weekdays: string;
    weekend: string;
  };
  tags: TagResponseDto[];
  images: ImageResponseDto[];
};

// ===============================
// 📰 Blog DTO
// ===============================
export type BlogPostRequestDto = {
  title: string;
  excerpt?: string;
  content: string;
  slug: string;
  categoryId?: number[];
  userId?: number;
  tagIds?: number[];
  imageIds?: number[];
};

export type BlogPostResponseDto = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  categories: CategoryResponseDto[];
  tags: TagResponseDto[];
  images: ImageResponseDto[];
};

// ===============================
// 👤 User DTO
// ===============================
export type UserLoginRequestDto = {
  email: string;
  password: string; // minLength: 6, maxLength: 30
};

export type UserLoginResponseDto = {
  token: string;
};

// ===============================
// 📄 Pagination DTO
// ===============================
export type SortObject = {
  direction: string; // "ASC" | "DESC"
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
};

export type PageableObject = {
  offset: number;
  sort: SortObject[];
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
};

export type Pageable = {
  page: number;
  size: number;
  sort?: string[];
};

// Обобщённый тип для пагинированных ответов
export type PageResponseDto<T> = {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: T[];
  sort?: SortObject[];
  pageable?: PageableObject;
  numberOfElements?: number;
};

// Удобные алиасы
export type PageCafeResponseDto = PageResponseDto<CafeResponseDto>;
export type PageBlogPostResponseDto = PageResponseDto<BlogPostResponseDto>;
