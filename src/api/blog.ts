import api from "../api";
import { blogPosts } from "../mocks/blogPosts";
import { blogPostBackendMock } from "../mocks/blogPostBackendMock";
import type {
  BlogPostRequestDto,
  BlogPostResponseDto,
  PageBlogPostResponseDto,
} from "../types/dto";

function isValidBlog(obj: any): boolean {
  return obj && typeof obj === "object" && "id" in obj && "slug" in obj;
}

// =========================
// 🔹 Список постов
// =========================
export const getBlogPosts = async (
  page = 0,
  size = 10
): Promise<PageBlogPostResponseDto> => {
  try {
    const res = await api.get(`/blog`, { params: { page, size } });
    const data = res.data;

    if (typeof data === "string") throw new Error("HTML instead of JSON");
    if (!data || !Array.isArray(data.content))
      throw new Error("Invalid blog list format");

    return data;
  } catch (err) {
    console.warn("⚠ Backend недоступен → используем моковые посты");

    const start = page * size;
    const end = start + size;
    const content = blogPosts.content.slice(start, end);

    return {
      content,
      totalElements: blogPosts.content.length,
      totalPages: Math.ceil(blogPosts.content.length / size),
      size,
      number: page,
      first: page === 0,
      last: end >= blogPosts.content.length,
      empty: content.length === 0,
      pageable: {
        offset: start,
        pageNumber: page,
        pageSize: size,
        paged: true,
        unpaged: false,
        sort: [],
      },
      sort: [],
      numberOfElements: content.length,
    };
  }
};

// =========================
// 🔹 Один пост (slug)
// =========================
export const getBlogPost = async (
  slug: string
): Promise<BlogPostResponseDto> => {
  try {
    const res = await api.get(`/blog/${slug}`);
    const data = res.data;

    if (typeof data === "string") throw new Error("HTML instead of JSON");
    if (!isValidBlog(data)) throw new Error("Invalid blog post format");

    return data;
  } catch (err) {
    console.warn(`⚠ Backend упал → используем мок для slug "${slug}"`);

    // ---------------------------------------------
    // 🔥 ВАРИАНТ B — круассаны только по slug
    // ---------------------------------------------
    if (slug === "best-croissants-in-kyiv") {
      console.log("✔ Используем backend-style мок blogPostBackendMock");
      return blogPostBackendMock;
    }

    // остальные посты берутся из обычного мока
    const mock = blogPosts.content.find((p) => p.slug === slug);

    return (
      mock ||
      blogPosts.content[0] // fallback
    );
  }
};

// =========================
// 🔹 CRUD
// =========================
export const createBlogPost = async (
  dto: BlogPostRequestDto
): Promise<BlogPostResponseDto> => {
  const { data } = await api.post(`/blog`, dto);
  return data;
};

export const updateBlogPost = async (
  id: number,
  dto: BlogPostRequestDto
): Promise<BlogPostResponseDto> => {
  const { data } = await api.put(`/blog/${id}`, dto);
  return data;
};
