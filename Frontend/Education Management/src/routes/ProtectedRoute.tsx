import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: ("admin" | "teacher" | "student")[];
}

function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Login nahi hai
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // Role allowed nahi hai
  if (
    allowedRoles &&
    !allowedRoles.includes(
      role as "admin" | "teacher" | "student"
    )
  ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;