// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../app/store";
import type { ReactElement, ReactNode } from "react";

type PrivateRouteProps = {
  children?: ReactElement | ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const token = useStore((s) => s.token);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children || <Outlet />}</>;
}
