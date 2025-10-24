import api from "../api";
import type {
  BlogPostRequestDto,
  BlogPostResponseDto,
  PageBlogPostResponseDto,
} from "../types/dto";

// === Получить список постов ===
export const getBlogPosts = async (page = 0, size = 10): Promise<PageBlogPostResponseDto> => {
  const { data } = await api.get(`/blog`, { params: { page, size } });
  return data;
};

// === Получить один пост по slug ===
export const getBlogPost = async (slug: string): Promise<BlogPostResponseDto> => {
  const { data } = await api.get(`/blog/${slug}`);
  return data;
};

// === Создать пост ===
export const createBlogPost = async (dto: BlogPostRequestDto): Promise<BlogPostResponseDto> => {
  const { data } = await api.post(`/blog`, dto);
  return data;
};
