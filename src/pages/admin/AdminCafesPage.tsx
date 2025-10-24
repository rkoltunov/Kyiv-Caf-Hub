import { useState, useEffect } from "react";
import { fetchCafes } from "../../mocks/cafes";
import type { CafeResponseDto } from "../../types/dto";
import { useStore } from "../../app/store"; // оставляем для будущего API

export default function AdminCafesPage() {
  const [cafes, setCafes] = useState<CafeResponseDto[]>([]);
  const [editing, setEditing] = useState<CafeResponseDto | null>(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    description: "",
    excerpt: "",
    latitude: "",
    longitude: "",
    hours: "",
  });
  const token = useStore((s) => s.token);

  useEffect(() => {
    fetchCafes().then(setCafes); // получаем мок
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name.trim()) return alert("Введите название кафе");

    const newCafe: CafeResponseDto = {
      id: Date.now(), // временный ID
      name: form.name,
      slug: form.name.toLowerCase().replace(/\s+/g, "-"),
      excerpt: form.excerpt,
      description: form.description,
      address: form.address,
      latitude: parseFloat(form.latitude) || 0,
      longitude: parseFloat(form.longitude) || 0,
      hours: form.hours,
      tags: [],
      images: [],
    };

    setCafes((prev) => [...prev, newCafe]);
    setForm({
      name: "",
      address: "",
      description: "",
      excerpt: "",
      latitude: "",
      longitude: "",
      hours: "",
    });
  };

  const handleEdit = (cafe: CafeResponseDto) => {
    setEditing(cafe);
    setForm({
      name: cafe.name,
      address: cafe.address,
      description: cafe.description,
      excerpt: cafe.excerpt,
      latitude: cafe.latitude.toString(),
      longitude: cafe.longitude.toString(),
      hours: cafe.hours,
    });
  };

  const handleUpdate = () => {
    if (!editing) return;
    setCafes((prev) =>
      prev.map((c) => (c.id === editing.id ? { ...c, ...form, latitude: parseFloat(form.latitude), longitude: parseFloat(form.longitude) } : c))
    );
    setEditing(null);
    setForm({
      name: "",
      address: "",
      description: "",
      excerpt: "",
      latitude: "",
      longitude: "",
      hours: "",
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Удалить это кафе?")) {
      setCafes((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Управление кафе</h1>

      {/* Форма добавления / редактирования */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">{editing ? "Редактировать кафе" : "Добавить новое кафе"}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input name="name" placeholder="Название" value={form.name} onChange={handleChange} className="border p-3 rounded-lg w-full" />
          <input name="address" placeholder="Адрес" value={form.address} onChange={handleChange} className="border p-3 rounded-lg w-full" />
        </div>

        <textarea name="description" placeholder="Описание" value={form.description} onChange={handleChange} className="border p-3 rounded-lg w-full mb-4" rows={3} />
        <textarea name="excerpt" placeholder="Краткое описание" value={form.excerpt} onChange={handleChange} className="border p-3 rounded-lg w-full mb-4" rows={2} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input name="latitude" placeholder="Широта" value={form.latitude} onChange={handleChange} className="border p-3 rounded-lg w-full" />
          <input name="longitude" placeholder="Долгота" value={form.longitude} onChange={handleChange} className="border p-3 rounded-lg w-full" />
          <input name="hours" placeholder="Часы работы" value={form.hours} onChange={handleChange} className="border p-3 rounded-lg w-full" />
        </div>

        {editing ? (
          <div className="flex gap-3">
            <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Сохранить изменения</button>
            <button onClick={() => { setEditing(null); setForm({ name: "", address: "", description: "", excerpt: "", latitude: "", longitude: "", hours: "" }); }} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition">Отмена</button>
          </div>
        ) : (
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Добавить кафе</button>
        )}
      </div>

      {/* Таблица кафе */}
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
                <button onClick={() => handleEdit(cafe)} className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">Изменить</button>
                <button onClick={() => handleDelete(cafe.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cafes.length === 0 && <p className="text-gray-500 text-center mt-6">Нет кафе для отображения.</p>}
    </div>
  );
}