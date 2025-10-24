import { Link } from "react-router-dom";
import { useStore } from "../../app/store";

export default function AdminDashboardPage() {
  const logout = useStore((s) => s.logout);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Админ-панель</h1>

      <nav className="flex gap-4 mb-8">
        <Link
          to="/admin/cafes"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Кафе
        </Link>
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
        >
          Выйти
        </button>
      </nav>

      <p className="text-gray-600">
        Выберите раздел слева для управления контентом.
      </p>
    </div>
  );
}