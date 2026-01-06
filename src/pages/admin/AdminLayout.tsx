// src/pages/admin/AdminLayout.tsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../../app/store";

export default function AdminLayout() {
  const logout = useStore((s) => s.logout);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F9F8F5]">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">☕ Admin Panel</h2>



        <NavLink
          to="/admin/cafes"
          className={({ isActive }) =>
            `block py-2 px-3 rounded-md mb-2 ${
              isActive ? "bg-black text-white" : "hover:bg-gray-100"
            }`
          }
        >
          Cafés
        </NavLink>


        <NavLink
  to="/admin/blogs"
  className={({ isActive }) =>
    `block py-2 px-3 rounded-md mb-2 ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
  }
>
Blogs
        </NavLink>
        <NavLink
  to="/admin/blogs"
  className={({ isActive }) =>
    `block py-2 px-3 rounded-md mb-2 ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
  }
>
Add tag
</NavLink>

        <button
          onClick={() => {
            logout();
            navigate("/admin/login");
          }}
          className="mt-auto py-2 px-3 text-left text-red-500 hover:bg-red-50 rounded-md"
        >
          Log out
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
