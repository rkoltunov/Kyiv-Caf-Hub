import { useEffect, useState } from "react";
import api from "../../../api";
import { useStore } from "../../../app/store";
import type { CategoryResponseDto } from "../../../types/dto";

type Props = {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
};

export default function CategorySelector({ selectedIds, setSelectedIds }: Props) {
  const token = useStore((s) => s.token);
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Загружаем все категории (автоматически)
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const results: CategoryResponseDto[] = [];
        let id = 1;

        // ⚙️ Пробуем подгрузить категории подряд, пока не будет 404
        while (true) {
          try {
            const res = await api.get(`/category/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            results.push(res.data);
            id++;
          } catch (err: any) {
            if (err.response?.status === 404) break; // больше нет категорий
            else throw err;
          }
        }

        setCategories(results);
      } catch (err) {
        console.error("Ошибка загрузки категорий:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [token]);

  // 🔹 Переключение выбранной категории
  const toggle = (id: number) => {
    setSelectedIds(selectedIds.includes(id) ? [] : [id]);
  };

  // 🔹 Добавить новую категорию
  const addCategory = async () => {
    if (!newCategory.trim()) return alert("Введите название категории");

    try {
      const res = await api.post(
        "/category",
        { name: newCategory.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories((prev) => [...prev, res.data]);
      setNewCategory("");
    } catch (err) {
      console.error("Ошибка при добавлении категории:", err);
      alert("Не удалось добавить категорию");
    }
  };

  return (
    <div className="border-t pt-6">
      <h3 className="font-semibold mb-3">Categories</h3>

      {/* Загрузка */}
      {loading && <p className="text-gray-500 text-sm">Загрузка категорий...</p>}

      {/* Список категорий */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <label
            key={cat.id}
            className={`border rounded-md px-3 py-1 cursor-pointer ${
              selectedIds.includes(cat.id)
                ? "bg-black text-white border-black"
                : "bg-white"
            }`}
          >
            <input
              type="radio"
              checked={selectedIds.includes(cat.id)}
              onChange={() => toggle(cat.id)}
              className="hidden"
            />
            {cat.name}
          </label>
        ))}
      </div>

      {/* Добавление новой категории */}
      <div className="flex flex-col sm:flex-row gap-2 items-center border-t pt-3">
        <input
          type="text"
          placeholder="Новая категория"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border rounded-md p-2 text-sm flex-1"
        />
        <button
          onClick={addCategory}
          className="bg-black text-white px-3 py-2 rounded-lg text-sm"
        >
          Add Category
        </button>
      </div>
    </div>
  );
}
