import { useState, useEffect } from "react";
import api from "../../api";
import { useStore } from "../../app/store";
import type { ImageResponseDto } from "../../types/dto";

type Props = {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  availableIds?: number[];   // ← ДОБАВЛЕНО!
};

export default function ImageSelector({ selectedIds, setSelectedIds, availableIds }: Props) {
  const token = useStore((s) => s.token);
  const [images, setImages] = useState<ImageResponseDto[]>([]);
  const [search, setSearch] = useState("");
  const [newImage, setNewImage] = useState({
    imageUrl: "",
    altText: "",
  });

  useEffect(() => {
    const loadImages = async () => {
      const res = await api.get("/image", {
        headers: { Authorization: `Bearer ${token}` },
        params: { size: 1000 },
      });
      setImages(res.data.content || res.data || []);
    };
    loadImages();
  }, [token]);

  const toggle = (id: number) => {
    setSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter((t) => t !== id)
        : [...selectedIds, id]
    );
  };

  const addImage = async () => {
    if (!newImage.imageUrl.trim() || !newImage.altText.trim())
      return alert("Enter URL and alt text");

    try {
      const res = await api.post("/image", newImage, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages((p) => [...p, res.data]);
      setNewImage({ imageUrl: "", altText: "" });
    } catch {
      alert("Error adding image");
    }
  };

  // 🔥 ФИЛЬТРАЦИЯ ПО availableIds — ГЛАВНОЕ ИЗМЕНЕНИЕ
  const availableImages = availableIds && availableIds.length > 0
    ? images.filter((img) => availableIds.includes(img.id))
    : images;

  const filtered = availableImages.filter((img) =>
    img.altText.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="border-t pt-6">
      <h3 className="font-semibold mb-3">Images</h3>

      <input
        placeholder="Search alt..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md p-2 text-sm mb-4"
      />

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]">
        {filtered.map((img) => (
          <label key={img.id} className="cursor-pointer text-center">
            <input
              type="checkbox"
              checked={selectedIds.includes(img.id)}
              onChange={() => toggle(img.id)}
              className="hidden"
            />
            <img
              src={img.imageUrl}
              alt={img.altText}
              className={`w-[120px] aspect-square object-cover rounded-md border ${
                selectedIds.includes(img.id) ? "ring-2 ring-blue-500" : ""
              }`}
            />
            <p className="text-xs mt-1">{img.altText}</p>
          </label>
        ))}
      </div>

      <div className="border-t pt-4 mt-6 flex flex-col sm:flex-row gap-2 items-center">
        <input
          type="url"
          placeholder="Image URL"
          value={newImage.imageUrl}
          onChange={(e) => setNewImage((p) => ({ ...p, imageUrl: e.target.value }))}
          className="border rounded-md p-2 text-sm flex-1"
        />
        <input
          type="text"
          placeholder="Alt"
          value={newImage.altText}
          onChange={(e) => setNewImage((p) => ({ ...p, altText: e.target.value }))}
          className="border rounded-md p-2 text-sm flex-1"
        />

        <button
          onClick={addImage}
          className="bg-black text-white px-3 py-2 rounded-lg text-sm"
        >
          Add Image
        </button>
      </div>
    </div>
  );
}
