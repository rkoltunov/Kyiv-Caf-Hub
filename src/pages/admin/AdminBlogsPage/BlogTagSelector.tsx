import { useState, useEffect } from "react";
import api from "../../../api";
import { useStore } from "../../../app/store";
import type { TagResponseDto } from "../../../types/dto";

type Props = {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  allowedCategories?: string[];
};

export default function TagSelector({ selectedIds, setSelectedIds, allowedCategories }: Props) {
  const token = useStore((s) => s.token);
  const [tags, setTags] = useState<TagResponseDto[]>([]);
  const [newTag, setNewTag] = useState({
    name: "",
    slug: "",
  });

  // 🔹 загрузка тегов
  useEffect(() => {
    const loadTags = async () => {
      try {
        const res = await api.get("/tag", {
          headers: { Authorization: `Bearer ${token}` },
        });

        let data: TagResponseDto[] = res.data || [];

        // показываем только разрешённые категории (например, только OTHER)
        if (allowedCategories && allowedCategories.length > 0) {
          data = data.filter((t) => allowedCategories.includes(t.category));
        }

        // сортировка по имени
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
      selectedIds.includes(id)
        ? selectedIds.filter((t) => t !== id)
        : [...selectedIds, id]
    );
  };

  // 🔹 создание нового тега (всегда с категорией OTHER)
  const addTag = async () => {
    if (!newTag.name.trim()) return alert("Введите имя тега");

    const payload = {
      name: newTag.name,
      slug: newTag.slug || newTag.name.toLowerCase().replace(/\s+/g, "-"),
      tagCategory: "OTHER", // ✅ всегда OTHER
    };

    try {
      const res = await api.post("/tag", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTags((prev) => [...prev, res.data].sort((a, b) => a.name.localeCompare(b.name)));
      setNewTag({ name: "", slug: "" });
    } catch (err) {
      console.error("Ошибка при добавлении тега:", err);
      alert("Ошибка при добавлении тега");
    }
  };

  return (
    <div className="border-t pt-6">
      <h3 className="font-semibold mb-3">Tags (только категория Other)</h3>

      {/* 🔹 список тегов */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <label
            key={tag.id}
            className={`border rounded-md px-3 py-1 cursor-pointer ${
              selectedIds.includes(tag.id)
                ? "bg-black text-white border-black"
                : "bg-white"
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

      {/* 🔹 добавление нового тега */}
      <div className="flex flex-col sm:flex-row gap-2 items-center border-t pt-3">
        <input
          type="text"
          placeholder="Название тега"
          value={newTag.name}
          onChange={(e) =>
            setNewTag({
              ...newTag,
              name: e.target.value,
              slug: e.target.value
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/gi, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-"),
            })
          }
          className="border rounded-md p-2 text-sm flex-1"
        />
        <input
  type="text"
  placeholder="Slug"
  value={newTag.slug}
  onChange={(e) =>
    setNewTag({
      ...newTag,
      slug: e.target.value.toLowerCase().trim(),
    })
  }
  className="border rounded-md p-2 text-sm flex-1"
/>


        <button
          onClick={addTag}
          className="bg-black text-white px-3 py-2 rounded-lg text-sm"
        >
          Add Tag
        </button>
      </div>
    </div>
  );
}
