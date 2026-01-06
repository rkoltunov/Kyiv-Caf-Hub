import { useEffect, useState } from "react";
import api from "../../../api";
import { useStore } from "../../../app/store";
import type { BlogPostResponseDto, BlogPostRequestDto } from "../../../types/dto";
import BlogForm from "./BlogForm";
import BlogTable from "./BlogTable";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPostResponseDto[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPostResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const token = useStore((s) => s.token);

  // 🔹 загрузка всех блогов
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blog", {
          headers: { Authorization: `Bearer ${token}` },
          params: { size: 100 },
        });
        setBlogs(res.data.content || []);
      } catch (err) {
        console.error("Ошибка загрузки блогов:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [token]);

  // 🔹 сохранение (создание / обновление)
  const handleSave = async (data: BlogPostRequestDto, id?: number) => {
    try {
      console.log("🟣 handleSave payload:", data, "id:", id);

      if (id) {
        // ✅ обновление
        await api.put(`/blog/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // ✅ создание
        await api.post("/blog", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // обновить список после сохранения
      const res = await api.get("/blog", {
        headers: { Authorization: `Bearer ${token}` },
        params: { size: 100 },
      });
      setBlogs(res.data.content || []);
      setSelectedBlog(null);
    } catch (err) {
      console.error("Ошибка сохранения:", err);
      alert("Ошибка при сохранении блога");
    }
  };

  if (loading) return <p className="p-4">Загрузка...</p>;

  return (
    <div className="p-6 space-y-10">
      {/* ===== ФОРМА ===== */}
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {selectedBlog ? "Редактировать блог" : "Добавить новый блог"}
          </h1>

          {selectedBlog && (
            <button
              onClick={() => setSelectedBlog(null)}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
            >
              ✕ Отмена
            </button>
          )}
        </div>

        <BlogForm
          initialData={selectedBlog || undefined}
          onCancel={() => setSelectedBlog(null)}
          onSave={handleSave}
        />
      </div>

      {/* ===== ТАБЛИЦА ===== */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Список блогов</h2>
        <BlogTable
          blogs={blogs}
          onEdit={(blog) => {
            console.log("🟢 Клик редактировать:", blog.title);
            setSelectedBlog(blog);
          }}
        />
      </div>
    </div>
  );
}
