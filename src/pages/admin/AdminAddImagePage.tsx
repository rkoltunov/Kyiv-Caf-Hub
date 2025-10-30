import { useState } from "react";
import api from "../../api";

export default function AdminAddImagePage() {
  const [form, setForm] = useState({
    imageUrl: "",
    altText: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/image", form);
      if (res.status === 201 || res.status === 200) {
        setSuccess(`✅ Изображение добавлено (ID: ${res.data.id})`);
        setForm({ imageUrl: "", altText: "" });
      }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "❌ Ошибка при добавлении изображения");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Добавить изображение</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="imageUrl"
          type="url"
          placeholder="URL изображения (https://...)"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          name="altText"
          type="text"
          placeholder="Alt-текст (описание картинки)"
          value={form.altText}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt={form.altText || "preview"}
            className="w-full rounded-lg border mb-4 max-h-64 object-cover"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        )}

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}

        <button type="submit" className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800">
          Добавить
        </button>
      </form>
    </div>
  );
}
