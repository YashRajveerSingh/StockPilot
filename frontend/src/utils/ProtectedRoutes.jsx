import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({
  children,
  requireRole = [],
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const userRole =
      user?.role?.toLowerCase();

    const allowedRoles =
      requireRole.map((role) =>
        role.toLowerCase()
      );

    if (
      requireRole.length > 0 &&
      !allowedRoles.includes(userRole)
    ) {
      navigate("/unauthorized");
    }
  }, [user, navigate, requireRole]);

  if (!user) return null;

  const userRole =
    user?.role?.toLowerCase();

  const allowedRoles =
    requireRole.map((role) =>
      role.toLowerCase()
    );

  if (
    requireRole.length > 0 &&
    !allowedRoles.includes(userRole)
  ) {
    return null;
  }

  return children;
};

export default ProtectedRoutes;