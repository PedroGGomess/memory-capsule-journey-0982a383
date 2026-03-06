import { Navigate } from "react-router-dom";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { ReactNode } from "react";

interface AcademyProtectedRouteProps {
  children: ReactNode;
}

const AcademyProtectedRoute = ({ children }: AcademyProtectedRouteProps) => {
  const { isAuthenticated } = useAcademyAuth();
  if (!isAuthenticated) {
    return <Navigate to="/academy/login" replace />;
  }
  return <>{children}</>;
};

export default AcademyProtectedRoute;
