import { Navigate } from "react-router-dom";
import AppLayout from "../layouts/app/AppLayout";

export default function AuthRoutes() {
  const isAuthenticated = Boolean(localStorage.getItem("jwt"));

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <AppLayout />;
}
