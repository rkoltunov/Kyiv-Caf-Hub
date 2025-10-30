import { useState } from "react";
import api from "../../api";

const categories = ["METRO", "VIBE", "MENU", "ACCESSIBILITY", "BUDGET", "OTHER"];

// =============================
// 🔤 Генератор slug
// =============================
const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-я0-9\s-]/gi, "") // убираем лишние символы
    .replace(/\s+/g, "-") // пробелы → дефисы
    .replace(/-+/g, "-"); // двойные дефисы → один

export default function AdminAddTagPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    tagCategory: "OTHER",
  });

  const [isSlugEdited, setIsSlugEdited] = useState(false); // 👈 чтобы знать, редактировал ли юзер вручную
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // =============================
  // ✏️ Изменение полей
  // =============================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      // Автоматически генерируем slug, пока пользователь не начал его редактировать вручную
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: isSlugEdited ? prev.slug : generateSlug(value),
      }));
    } else if (name === "slug") {
      // Если человек вручную вводит slug — больше не трогаем его автоматически
      setIsSlugEdited(true);
      setForm((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // =============================
  // 🚀 Отправка формы
  // =============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/tag", form);
      if (res.status === 201 || res.status === 200) {
        setSuccess("✅ Тег успешно добавлен!");
        setForm({ name: "", slug: "", tagCategory: "OTHER" });
        setIsSlugEdited(false); // сбрасываем флаг
      }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "❌ Ошибка при добавлении тега");
    }
  };

  // =============================
  // 🧱 UI
  // =============================
  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Добавить тег</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Название */}
        <input
          name="name"
          placeholder="Название (например: Vegan)"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        {/* Slug (автогенерация) */}
        <input
          name="slug"
          placeholder="Slug (например: vegan)"
          value={form.slug}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-50"
          required
        />

        {/* Категория */}
        <select
          name="tagCategory"
          value={form.tagCategory}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Сообщения */}
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Кнопка */}
        <button
          type="submit"
          className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 w-full"
        >
          Добавить тег
        </button>
      </form>
    </div>
  );
}
