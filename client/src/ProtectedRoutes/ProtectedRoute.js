import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ isAdminRoute = false }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (isAdminRoute && user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }
  return <Outlet />;
};
