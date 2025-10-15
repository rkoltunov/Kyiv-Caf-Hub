import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import CatalogPage from "../pages/catalog/CatalogPage";
import CafePage from "../pages/CafePage";
import BlogsPage from "../pages/Blogs/BlogsPage";
import BlogPage from "../pages/Blogs/BlogPage";
import AboutPage from "../pages/AboutPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import { MainLayout } from "../components/layout/MainLayout";
import BlogCategoryPage from "../pages/Blogs/BlogCategoryPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />, // layout без children – всё будет внутри <Outlet />
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/cafes/:id", element: <CafePage /> },
      { path: "/blog", element: <BlogsPage /> },
      { path: "/blog/:id", element: <BlogPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/blog/category/:slug", element: <BlogCategoryPage />},
      {
        path: "/admin",
        children: [
          { index: true, element: <AdminLoginPage /> },
          { path: "dashboard", element: <AdminDashboardPage /> },
        ],
      },

    ],
  },
]);
