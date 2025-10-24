import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../app/store";

export default function PrivateRoute() {
  const token = useStore((s) => s.token);

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}