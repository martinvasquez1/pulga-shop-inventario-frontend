import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoutes({}) {
  const isAuthenticated = Boolean(localStorage.getItem("jwt"));

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}
