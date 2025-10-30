import { useState, useEffect } from "react";
import api from "../../api";
import type {
  CafeResponseDto,
  CafeRequestDto,
  CafeUpdateRequestDto,
  TagResponseDto,
  ImageResponseDto,
} from "../../types/dto";
import { useStore } from "../../app/store";

// =============================
// 🔤 Генерация slug
// =============================
const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-я0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function AdminCafesPage() {
  const [cafes, setCafes] = useState<CafeResponseDto[]>([]);
  const [editing, setEditing] = useState<CafeResponseDto | null>(null);

  const [form, setForm] = useState<CafeRequestDto>({
    name: "",
    slug: "",
    excerpt: "",
    description: "",
    address: "",
    latitude: 0,
    longitude: 0,
    hours: "",
    tagIds: [],
    imageIds: [],
  });

  const [tags, setTags] = useState<TagResponseDto[]>([]);
  const [images, setImages] = useState<ImageResponseDto[]>([]);
  const [tagCategoryFilter, setTagCategoryFilter] = useState("ALL");
  const [imageSearch, setImageSearch] = useState("");
  const [visibleImages, setVisibleImages] = useState(16);
  const [loading, setLoading] = useState(true);
  const token = useStore((s) => s.token);

  // ==============================
  // 🔄 Загрузка данных
  // ==============================
  useEffect(() => {
    const loadData = async () => {
      try {
        const [cafesRes, tagsRes, imgsRes] = await Promise.all([
          api.get("/cafe", {
            headers: { Authorization: `Bearer ${token}` },
            params: { size: 1000 },
          }),
          api.get("/tag", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/image", {
            headers: { Authorization: `Bearer ${token}` },
            params: { size: 1000 },
          }),
        ]);

        setCafes(cafesRes.data.content || cafesRes.data || []);
        setTags(tagsRes.data || []);
        setImages(imgsRes.data.content || []);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  // ==============================
  // ✏️ Управление формой
  // ==============================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      slug: name === "name" ? generateSlug(value) : prev.slug,
    }));
  };

  const handleToggleTag = (id: number) => {
    setForm((prev) => ({
      ...prev,
      tagIds: prev.tagIds?.includes(id)
        ? prev.tagIds.filter((t) => t !== id)
        : [...(prev.tagIds || []), id],
    }));
  };

  const handleToggleImage = (id: number) => {
    setForm((prev) => ({
      ...prev,
      imageIds: prev.imageIds?.includes(id)
        ? prev.imageIds.filter((i) => i !== id)
        : [...(prev.imageIds || []), id],
    }));
  };

  // ==============================
  // ➕ Добавление
  // ==============================
  const handleAdd = async () => {
    const payload: CafeRequestDto  = {
      name: form.name.trim(),
      slug: generateSlug(form.name),
      excerpt: form.excerpt,
      description: form.description,
      address: form.address,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      hours: form.hours,
      tagIds: form.tagIds || [],
      imageIds: form.imageIds || [],
    };

    try {
      const res = await api.post("/cafe", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 201 || res.status === 200) {
        setCafes((prev) => [...prev, res.data]);
        resetForm();
      }
    } catch (err: any) {
      console.error("Ошибка при добавлении:", err);
      alert(err?.response?.data?.message ?? "❌ Ошибка при добавлении кафе");
    }
  };

  // ==============================
  // 🧱 Редактирование
  // ==============================
  const handleEdit = (cafe: CafeResponseDto) => {
    setEditing(cafe);
    setForm({
      name: cafe.name,
      slug: cafe.slug,
      excerpt: cafe.excerpt,
      description: cafe.description,
      address: cafe.address,
      latitude: cafe.latitude,
      longitude: cafe.longitude,
      hours: cafe.hours,
      tagIds: cafe.tags?.map((t) => t.id) || [],
      imageIds: cafe.images?.map((i) => i.id) || [],
    });
  };

  const handleUpdate = async () => {
    if (!editing) return;
  
    const updatedData = {
      name: form.name.trim(),
      slug: generateSlug(form.name),
      excerpt: form.excerpt,
      description: form.description,
      address: form.address,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      hours: form.hours,
      tagIds: form.tagIds || [],    // ✅ как в Swagger
      imageIds: form.imageIds || [], // ✅ как в Swagger
    };
  
    console.log("Отправка запроса:", `/cafe/${editing.id}`, updatedData);
  
    try {
      const res = await api.put(`/cafe/${editing.id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (res.status === 200) {
        setCafes((prev) =>
          prev.map((c) => (c.id === editing.id ? res.data : c))
        );
        setEditing(null);
        resetForm();
      }
    } catch (err: any) {
      console.error("Ошибка обновления:", err);
      alert(err?.response?.data?.message ?? "❌ Ошибка при обновлении кафе");
    }
  };
  
  

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить это кафе?")) return;
    try {
      const res = await api.delete(`/cafe/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200 || res.status === 204) {
        setCafes((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err: any) {
      console.error("Ошибка удаления:", err);
      alert(err?.response?.data?.message ?? "❌ Ошибка при удалении кафе");
    }
  };

  const resetForm = () =>
    setForm({
      name: "",
      slug: "",
      excerpt: "",
      description: "",
      address: "",
      latitude: 0,
      longitude: 0,
      hours: "",
      tagIds: [],
      imageIds: [],
    });

  // ==============================
  // 🧱 UI
  // ==============================
  if (loading)
    return <p className="text-center text-gray-500 mt-10">Загрузка данных...</p>;

  const filteredTags =
    tagCategoryFilter === "ALL"
      ? tags
      : tags.filter((tag) => tag.category === tagCategoryFilter);

  const filteredImages = images.filter((img) =>
    img.altText.toLowerCase().includes(imageSearch.toLowerCase())
  );
  const visibleFilteredImages = filteredImages.slice(0, visibleImages);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Управление кафе</h1>

      {/* === Форма === */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editing ? "Редактировать кафе" : "Добавить новое кафе"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            name="name"
            placeholder="Название"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
          <input
            name="slug"
            placeholder="Slug (авто)"
            value={form.slug}
            readOnly
            className="border p-3 rounded-lg w-full bg-gray-100 text-gray-600"
          />
        </div>

        <textarea
          name="excerpt"
          placeholder="Краткое описание"
          value={form.excerpt}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-4"
          rows={2}
        />
        <textarea
          name="description"
          placeholder="Описание"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-4"
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            name="address"
            placeholder="Адрес"
            value={form.address}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
          <input
            name="latitude"
            type="number"
            placeholder="Широта"
            value={form.latitude}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
          <input
            name="longitude"
            type="number"
            placeholder="Долгота"
            value={form.longitude}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <input
          name="hours"
          placeholder="Часы работы"
          value={form.hours}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-6"
        />

        {/* === Теги === */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Теги</h3>
            <select
              value={tagCategoryFilter}
              onChange={(e) => setTagCategoryFilter(e.target.value)}
              className="border rounded-md p-2 text-sm"
            >
              <option value="ALL">Все категории</option>
              <option value="METRO">METRO</option>
              <option value="VIBE">VIBE</option>
              <option value="MENU">MENU</option>
              <option value="ACCESSIBILITY">ACCESSIBILITY</option>
              <option value="BUDGET">BUDGET</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3">
            {filteredTags.map((tag) => (
              <label
                key={tag.id}
                className="flex items-center gap-2 border rounded-md px-3 py-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={form.tagIds?.includes(tag.id) || false}
                  onChange={() => handleToggleTag(tag.id)}
                />
                <span>{tag.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* === Изображения === */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Изображения</h3>
            <input
              type="text"
              placeholder="Поиск по alt..."
              value={imageSearch}
              onChange={(e) => setImageSearch(e.target.value)}
              className="border rounded-md p-2 text-sm"
            />
          </div>
          <div
  className="
    grid 
    gap-4
    [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]
  "
>
            {visibleFilteredImages.map((img) => (
              <label key={img.id} className="cursor-pointer text-center">
                <input
                  type="checkbox"
                  checked={form.imageIds?.includes(img.id) || false}
                  onChange={() => handleToggleImage(img.id)}
                  className="mb-1"
                />
                <img
                  src={img.imageUrl}
                  alt={img.altText}
                  className="w-[150px] aspect-square object-cover rounded-md border"
                />
                <p className="text-xs mt-1">{img.altText}</p>
              </label>
            ))}
          </div>

          {visibleImages < filteredImages.length && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setVisibleImages((prev) => prev + 16)}
                className="text-sm text-blue-600 hover:underline"
              >
                Показать больше
              </button>
            </div>
          )}
        </div>

        {/* === Кнопки === */}
        {editing ? (
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Сохранить изменения
            </button>
            <button
              onClick={() => {
                setEditing(null);
                resetForm();
              }}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Отмена
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Добавить кафе
          </button>
        )}
      </div>

      {/* === Таблица кафе === */}
      <table className="min-w-full bg-white border rounded-xl shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Название</th>
            <th className="p-3 border-b">Адрес</th>
            <th className="p-3 border-b w-40">Действия</th>
          </tr>
        </thead>
        <tbody>
          {cafes.map((cafe) => (
            <tr key={cafe.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{cafe.id}</td>
              <td className="p-3 border-b font-medium">{cafe.name}</td>
              <td className="p-3 border-b text-gray-600">{cafe.address}</td>
              <td className="p-3 border-b flex gap-2">
                <button
                  onClick={() => handleEdit(cafe)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Изменить
                </button>
                <button
                  onClick={() => handleDelete(cafe.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
