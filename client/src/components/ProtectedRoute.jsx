import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoaderCircleIcon } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useSelector((state) => state.auth);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <LoaderCircleIcon className="animate-spin size-8 text-indigo-600" />
      </div>
    );
  }

  // Redirect to home if not authenticated
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
