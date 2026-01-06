import { useState, useEffect } from "react";
import api from "../../../api";
import { useStore } from "../../../app/store";
import type { TagResponseDto } from "../../../types/dto";

type Props = {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  allowedCategories?: string[]; // ✅ новое поле
};

export default function TagSelector({ selectedIds, setSelectedIds, allowedCategories }: Props) {
  const token = useStore(s => s.token);
  type TagCategory = "METRO" | "VIBE" | "MENU" | "ACCESSIBILITY" | "BUDGET" | "OTHER";
  const [tags, setTags] = useState<TagResponseDto[]>([]);
  const [newTag, setNewTag] = useState<{
    name: string;
    slug: string;
    tagCategory: TagCategory;
  }>({
    name: "",
    slug: "",
    tagCategory: "METRO",
  });

  const categories = ["METRO", "VIBE", "MENU", "ACCESSIBILITY", "BUDGET", "OTHER"];

  // 🔹 загрузка и сортировка тегов
  useEffect(() => {
    const loadTags = async () => {
      try {
        const res = await api.get("/tag", {
          headers: { Authorization: `Bearer ${token}` },
        });

        let data: TagResponseDto[] = res.data || [];

        // ✅ если разрешённые категории заданы — фильтруем
        if (allowedCategories && allowedCategories.length > 0) {
          data = data.filter(t => allowedCategories.includes(t.category));
        }

        const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
        setTags(sorted);
      } catch (err) {
        console.error("Ошибка загрузки тегов:", err);
      }
    };
    loadTags();
  }, [token, allowedCategories]);

  const toggle = (id: number) => {
    setSelectedIds(
      selectedIds.includes(id) ? selectedIds.filter(t => t !== id) : [...selectedIds, id]
    );
  };

  // 🔹 создание нового тега
  const addTag = async () => {
    if (!newTag.name.trim()) return alert("Enter tag name");
    if (!newTag.slug.trim()) return alert("Enter slug");

    try {
      const res = await api.post("/tag", newTag, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // бэк вернёт TagResponseDto с category
      setTags(prev => {
        const updated = [...prev, res.data];
        return updated.sort((a, b) => {
          if (a.category !== b.category) {
            return categories.indexOf(a.category) - categories.indexOf(b.category);
          }
          return (a.name ?? "").localeCompare(b.name ?? "");
        });
      });

      setNewTag({ name: "", slug: "", tagCategory: "METRO" });
    } catch (err) {
      console.error("Ошибка при добавлении тега:", err);
      alert("Error adding tag");
    }
  };

  return (
    <div className="border-t pt-6">
      <h3 className="font-semibold mb-3">Tags</h3>

      {/* 🔹 вывод по категориям */}
      {categories.map(cat => {
        const group = tags.filter(t => t.category === cat);
        if (group.length === 0) return null;

        return (
          <div key={cat} className="mb-3">
            <h4 className="font-medium text-gray-700 mb-1">{cat}</h4>
            <div className="flex flex-wrap gap-2">
              {group.map(tag => (
                <label
                  key={tag.id}
                  className={`border rounded-md px-3 py-1 cursor-pointer ${
                    selectedIds.includes(tag.id) ? "bg-black text-white border-black" : "bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(tag.id)}
                    onChange={() => toggle(tag.id)}
                    className="hidden"
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>
        );
      })}

      {/* ➕ Добавление нового тега */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-center border-t pt-3">
        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1">Name (UA)</label>
          <input
            type="text"
            placeholder="Name"
            value={newTag.name}
            onChange={e =>
              setNewTag(p => ({
                ...p,
                name: e.target.value,
                slug: e.target.value
                  .toLowerCase()
                  .trim()
                  .replace(/[^a-z0-9\s-]/gi, "")
                  .replace(/\s+/g, "-")
                  .replace(/-+/g, "-"),
              }))
            }
            className="border rounded-md p-2 text-sm w-36"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1">Slug</label>
          <input
            type="text"
            placeholder="Slug"
            value={newTag.slug}
            onChange={e =>
              setNewTag(p => ({
                ...p,
                slug: e.target.value.toLowerCase().trim(),
              }))
            }
            className="border rounded-md p-2 text-sm w-36"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1">Category</label>
          <select
            value={newTag.tagCategory}
            onChange={e =>
              setNewTag(p => ({
                ...p,
                tagCategory: e.target.value as TagCategory, // ✅ приведение типа
              }))
            }
            className="border rounded-md p-2 text-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={addTag}
          className="bg-black text-white px-3 py-2 rounded-lg text-sm mt-4 sm:mt-6"
        >
          Add Tag
        </button>
      </div>
    </div>
  );
}
