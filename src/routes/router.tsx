import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import CatalogPage from "../pages/catalog/CatalogPage";
import CafePage from "../pages/CafePage";
import BlogsPage from "../pages/blog/BlogsPage";
import BlogPage from "../pages/blog/BlogPage";
import AboutPage from "../pages/AboutPage";
import BlogCategoryPage from "../pages/blog/BlogCategoryPage";
import NotFoundPage from "../pages/NotFoundPage";
import { MainLayout } from "../components/layout/MainLayout";

import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminCafesPage from "../pages/admin/AdminCafesPage/AdminCafesPage";
import PrivateRoute from "../components/PrivateRoute";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminBlogsPage from "../pages/admin/AdminBlogsPage/AdminBlogsPage";
// добавим layout

export const router = createBrowserRouter([
  // ======= Обычные страницы =======
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/cafe/:slug", element: <CafePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/blog", element: <BlogsPage /> },
      { path: "/blog/:slug", element: <BlogPage /> },
      { path: "/blog/category/:slug", element: <BlogCategoryPage /> },
      { path: "/404", element: <NotFoundPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // ======= Админка =======
  {
    path: "/admin",
    children: [
      // 🔑 Login
      { index: true, element: <Navigate to="/admin/login" replace /> },
      { path: "login", element: <AdminLoginPage /> },

      // 🔐 Закрытые маршруты
      {
        element: (
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        ),
        children: [
          { path: "cafes", element: <AdminCafesPage /> },
          { path: "blogs", element: <AdminBlogsPage /> },
        ],
      },
    ],
  },
]);
