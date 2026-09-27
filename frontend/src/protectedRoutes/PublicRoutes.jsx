import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { LoaderCircle } from "lucide-react";

const PublicRoutes = () => {
  const { user, isLoading } = useSelector((store) => store.auth);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="w-10 h-10 text-black animate-spin" />

          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">Loading...</h2>
            <p className="text-sm text-gray-500 mt-1">
              Please wait while we verify your session.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
