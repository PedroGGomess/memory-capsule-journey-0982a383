import { Navigate } from "react-router-dom";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { ReactNode } from "react";

interface AcademyProtectedRouteProps {
  children: ReactNode;
}

const AcademyProtectedRoute = ({ children }: AcademyProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAcademyAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-primary/40 text-sm tracking-[0.3em] uppercase animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/academy/login" replace />;
  }

  return <>{children}</>;
};

export default AcademyProtectedRoute;
