import type { BlogPostResponseDto } from "../../../types/dto";

type Props = {
  blogs: BlogPostResponseDto[];
  onEdit: (blog: BlogPostResponseDto) => void;
};

export default function BlogTable({ blogs, onEdit }: Props) {
  if (!blogs.length) return <p>Нет блогов</p>;

  return (
    <table className="w-full border-collapse border text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Название</th>
          <th className="border px-4 py-2">Slug</th>
          <th className="border px-4 py-2">Категории</th>
          <th className="border px-4 py-2">Действия</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <td className="border px-4 py-2">{blog.id}</td>
            <td className="border px-4 py-2">{blog.title}</td>
            <td className="border px-4 py-2">{blog.slug}</td>
            <td className="border px-4 py-2">
              {blog.categories?.map((c) => c.name).join(", ")}
            </td>
            <td className="border px-4 py-2">
            <button
  onClick={() => {
    console.log("🟢 Клик редактировать:", blog.title);
    onEdit(blog);
  }}
  className="text-blue-600 hover:underline mr-2"
>
  Редактировать
</button>
              <button
                onClick={() => console.log("TODO: удалить", blog.id)}
                className="text-red-600 hover:underline"
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
