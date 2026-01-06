import { useEffect, useState } from "react";
import type { BlogPostResponseDto, BlogPostRequestDto } from "../../../types/dto";
import BlogTagSelector from "../../../pages/admin/AdminBlogsPage/BlogTagSelector";
import ImageSelector from "../../../pages/admin/ImageSelector";
import CategorySelector from "./CategorySelector";

// Новая структура Place
type Place = {
  title: string;
  description: string;
  verdict: string;
  imageIds: number[];  // ← Добавили!
  bullets?: string[];  // можно оставить
};

type Props = {
  initialData?: BlogPostResponseDto;
  onCancel: () => void;
  onSave: (data: BlogPostRequestDto, id?: number) => void;
};

export default function BlogForm({ initialData, onCancel, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const [readTime, setReadTime] = useState("");
const [created, setCreated] = useState("");


  const [intro, setIntro] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [outro, setOutro] = useState("");

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<number[]>([]);
  const [currentId, setCurrentId] = useState<number | undefined>(undefined);

  // ================================
  // 🟦 При редактировании поста
  // ================================
  useEffect(() => {
    if (!initialData) return;

    setCurrentId(initialData.id);
    setTitle(initialData.title || "");
    setSlug(initialData.slug || "");
    setExcerpt(initialData.excerpt || "");

    // 🔵 ТОЛЬКО ЭТО — правильный разбор JSON
    try {
      const obj = JSON.parse(initialData.content);

      
  setReadTime(obj.readTime || "");
  setCreated(obj.created || "");

      setIntro(obj.intro || "");
      setPlaces(
        (obj.places || []).map((p: any) => ({
          ...p,
          imageIds: p.imageIds || []
        }))
      );
      setOutro(obj.outro || "");
    } catch (err) {
      console.error("❌ content is not JSON", err);
    }

    setSelectedCategoryIds(initialData.categories?.map((c) => c.id) || []);
    setSelectedTagIds(initialData.tags?.map((t) => t.id) || []);
    setSelectedImageIds(initialData.images?.map((i) => i.id) || []);
  }, [initialData]);

  // ================================
  // 🟦 Управление places
  // ================================

  const handleAddPlace = () => {
    setPlaces((prev) => [
      ...prev,
      { title: "", description: "", verdict: "", imageIds: [] }
    ]);
  };

  const handleRemovePlace = (index: number) => {
    setPlaces((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePlaceChange = (
    i: number,
    field: keyof Place,
    value: any
  ) => {
    setPlaces((prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], [field]: value };
      return updated;
    });
  };
  

  // ================================
  // 🟦 Сохранение
  // ================================
  const handleSave = () => {
    if (!title.trim() || !slug.trim()) {
      alert("Title и Slug обязательны");
      return;
    }

    // 🔥 Готовим структурированный JSON
    const structuredContent = {
      intro,
      places: places.map((p) => ({
        ...p,
        imageIds: p.imageIds || []
      })),
      outro,
      readTime,       // ← добавили
      created         // ← добавили
    };
    

    const payload: BlogPostRequestDto = {
      title,
      excerpt,
      slug,
      content: JSON.stringify(structuredContent), // ← ВАЖНО!
      categoryId: selectedCategoryIds,
      tagIds: selectedTagIds,
      imageIds: selectedImageIds
    };

    console.log("🟣 BlogForm → payload:", payload);
    onSave(payload, currentId);

    alert("Сохранено!");
  };

  // ================================
  // 🟦 UI
  // ================================

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Title + Slug */}
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block">
          <span className="font-medium">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2"
          />
        </label>

        <label className="block">
          <span className="font-medium">Slug</span>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border rounded w-full p-2"
          />
        </label>
      </div>

      {/* Excerpt */}
      <label className="block">
        <span className="font-medium">Excerpt</span>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="border rounded w-full p-2 h-24"
        />
      </label>

      {/* Read Time */}
{/* Reading Time */}
<label className="block">
  <span className="font-medium">Reading Time (любой текст)</span>
  <input
    type="text"
    value={readTime}
    onChange={(e) => setReadTime(e.target.value)}
    className="border rounded w-full p-2"
  />
</label>

{/* Created (дата текстом) */}
<label className="block mt-4">
  <span className="font-medium">Created (любой текст)</span>
  <input
    type="text"
    value={created}
    onChange={(e) => setCreated(e.target.value)}
    className="border rounded w-full p-2"
  />
</label>



      {/* Intro */}
      <label className="block">
        <span className="font-medium">Intro (введение)</span>
        <textarea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          className="border rounded w-full p-2 h-32"
          placeholder="Введение статьи..."
        />
      </label>

      {/* Places */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-lg">Places</span>
          <button
            type="button"
            onClick={handleAddPlace}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            + Add Place
          </button>
        </div>

        {places.map((place, index) => (
  <div
    key={index}
    className="border rounded p-3 mb-3 bg-gray-50 relative"
  >
    <button
      type="button"
      onClick={() => handleRemovePlace(index)}
      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
    >
      ✕
    </button>

    <label className="block mb-2">
      <span className="font-medium">Title</span>
      <input
        value={place.title}
        onChange={(e) =>
          handlePlaceChange(index, "title", e.target.value)
        }
        className="border rounded w-full p-2"
      />
    </label>

    <label className="block mb-2">
      <span className="font-medium">Description</span>
      <textarea
        value={place.description}
        onChange={(e) =>
          handlePlaceChange(index, "description", e.target.value)
        }
        className="border rounded w-full p-2 h-20"
      />
    </label>

    <label className="block mb-2">
      <span className="font-medium">Verdict</span>
      <textarea
        value={place.verdict}
        onChange={(e) =>
          handlePlaceChange(index, "verdict", e.target.value)
        }
        className="border rounded w-full p-2 h-20"
      />
    </label>

    {/* 🔥 Добавляем выбор изображений */}
    <label className="block mb-2">
      <span className="font-medium">Images for this place</span>
      <ImageSelector
  selectedIds={place.imageIds}
  setSelectedIds={(ids) => handlePlaceChange(index, "imageIds", ids)}
  availableIds={selectedImageIds}   // ← ДОБАВИЛИ ОГРАНИЧЕНИЕ!
/>
    </label>

  </div>
))}

      </div>

      {/* Outro */}
      <label className="block border-t pt-4">
        <span className="font-medium">Outro (заключение)</span>
        <textarea
          value={outro}
          onChange={(e) => setOutro(e.target.value)}
          className="border rounded w-full p-2 h-32"
          placeholder="Заключительные мысли..."
        />
      </label>

      {/* Категории */}
      <CategorySelector
        selectedIds={selectedCategoryIds}
        setSelectedIds={setSelectedCategoryIds}
      />

      {/* Теги */}
      <BlogTagSelector
        selectedIds={selectedTagIds}
        setSelectedIds={setSelectedTagIds}
        allowedCategories={["OTHER"]}
      />

      {/* Изображения */}
      <ImageSelector
        selectedIds={selectedImageIds}
        setSelectedIds={setSelectedImageIds}
      />

      {/* Кнопки */}
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={handleSave}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Сохранить
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100"
        >
          Отмена
        </button>
      </div>
    </div>
  );
}
