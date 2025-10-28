import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import CatalogPage from "../pages/catalog/CatalogPage";
import CafePage from "../pages/CafePage";
import BlogsPage from "../pages/blog/BlogsPage";
import BlogPage from "../pages/blog/BlogPage";
import AboutPage from "../pages/AboutPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import { MainLayout } from "../components/layout/MainLayout";
import BlogCategoryPage from "../pages/blog/BlogCategoryPage";
import PrivateRoute from "../components/PrivateRoute";
import AdminCafesPage from "../pages/admin/AdminCafesPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/cafe/:slug", element: <CafePage /> },
      { path: "/blog", element: <BlogsPage /> },
      { path: "/blog/:slug", element: <BlogPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/blog/category/:slug", element: <BlogCategoryPage /> },
      { path: "/404", element: <NotFoundPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // 🧩 Админка
  {
    path: "/admin",
    children: [
      { index: true, element: <AdminLoginPage /> },
      {
        element: <PrivateRoute />, // защита
        children: [{ path: "dashboard", element: <AdminDashboardPage /> },
          { path: "cafes", element: <AdminCafesPage /> },
        ],
      },
    ],
  },
]);
