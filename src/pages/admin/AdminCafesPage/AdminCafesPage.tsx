import { useState, useEffect } from "react";
import api from "../../../api";
import type { CafeResponseDto, CafeRequestDto } from "../../../types/dto";
import { useStore } from "../../../app/store";
import TagSelector from "./TagSelector";
import ImageSelector from "../ImageSelector";

// 🔤 Генерация slug
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
  const [loading, setLoading] = useState(true);

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

  const token = useStore(s => s.token);

  // ==============================
  // 🔄 Загрузка кафе
  // ==============================
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get("/cafe", {
          headers: { Authorization: `Bearer ${token}` },
          params: { size: 1000 },
        });
        setCafes(res.data.content || res.data || []);
      } catch (err) {
        console.error("Ошибка загрузки кафе:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  // ==============================
  // ✏️ Обработка полей
  // ==============================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      slug: name === "name" ? generateSlug(value) : prev.slug,
    }));
  };

  // ==============================
  // 📍 Авто-координаты по адресу (OpenStreetMap Nominatim)
  // ==============================
  const handleAddressBlur = async () => {
    if (!form.address.trim()) return;
    try {
      const res = await fetch(`/geocode/search?format=json&q=${encodeURIComponent(form.address)}`);

      const data = await res.json();
      if (data?.[0]) {
        setForm(prev => ({
          ...prev,
          latitude: parseFloat(parseFloat(data[0].lat).toFixed(4)),
          longitude: parseFloat(parseFloat(data[0].lon).toFixed(4)),
        }));
      }
    } catch (err) {
      console.error("Ошибка геокодинга:", err);
    }
  };

  // ==============================
  // ➕ Добавить кафе
  // ==============================
  const handleAddCafe = async () => {
    const payload: CafeRequestDto = {
      ...form,
      name: form.name.trim(),
      slug: generateSlug(form.name),
    };

    try {
      const res = await api.post("/cafe", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCafes(prev => [...prev, res.data]);
      resetForm();
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "❌ Ошибка при добавлении кафе");
    }
  };

  // ==============================
  // ✏️ Редактировать / обновить
  // ==============================
  const handleEditCafe = (cafe: CafeResponseDto) => {
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
      tagIds: cafe.tags?.map(t => t.id) || [],
      imageIds: cafe.images?.map(i => i.id) || [],
    });
  };

  const handleUpdateCafe = async () => {
    if (!editing) return;
    try {
      const res = await api.put(`/cafe/${editing.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCafes(prev => prev.map(c => (c.id === editing.id ? res.data : c)));
      setEditing(null);
      resetForm();
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "❌ Ошибка при обновлении кафе");
    }
  };

  // ==============================
  // ❌ Удаление
  // ==============================
  const handleDeleteCafe = async (id: number) => {
    if (!confirm("Удалить это кафе?")) return;
    try {
      await api.delete(`/cafe/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCafes(prev => prev.filter(c => c.id !== id));
    } catch {
      alert("Ошибка при удалении");
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

  if (loading) return <p className="text-center mt-10">Загрузка...</p>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Cafes Management</h1>

      {/* === Форма === */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Cafe name"
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug (auto)</label>
          <input
            name="slug"
            value={form.slug}
            className="border p-3 rounded-lg w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Excerpt</label>
          <textarea
            name="excerpt"
            rows={2}
            value={form.excerpt}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            name="address"
            value={form.address}
            onBlur={handleAddressBlur}
            onChange={handleChange}
            placeholder="Kyiv, Khreshchatyk 1"
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Latitude</label>
            <input
              name="latitude"
              type="number"
              step="any"
              value={form.latitude}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full [appearance:textfield]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Longitude</label>
            <input
              name="longitude"
              type="number"
              step="any"
              value={form.longitude}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full [appearance:textfield]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Working Hours</label>
          <input
            name="hours"
            value={form.hours}
            onChange={handleChange}
            placeholder="08:00 - 21:00"
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <TagSelector
          selectedIds={form.tagIds ?? []}
          setSelectedIds={ids => setForm(p => ({ ...p, tagIds: ids }))}
        />

        <ImageSelector
          selectedIds={form.imageIds ?? []}
          setSelectedIds={ids => setForm(p => ({ ...p, imageIds: ids }))}
        />

        <div className="flex gap-3 pt-4">
          {editing ? (
            <>
              <button
                onClick={handleUpdateCafe}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditing(null);
                  resetForm();
                }}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleAddCafe} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Add Cafe
            </button>
          )}
        </div>
      </div>

      {/* === Таблица === */}
      <table className="min-w-full bg-white border rounded-xl shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Address</th>
            <th className="p-3 border-b w-40">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cafes.map(cafe => (
            <tr key={cafe.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{cafe.id}</td>
              <td className="p-3 border-b font-medium">{cafe.name}</td>
              <td className="p-3 border-b text-gray-600">{cafe.address}</td>
              <td className="p-3 border-b flex gap-2">
                <button
                  onClick={() => handleEditCafe(cafe)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCafe(cafe.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
