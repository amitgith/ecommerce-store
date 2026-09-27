import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { LoaderCircle, ShieldCheck } from "lucide-react";

const ProtectedRoutes = () => {
  const { user, isLoading } = useSelector((store) => store.auth);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <LoaderCircle className="w-10 h-10 text-black animate-spin" />
            <ShieldCheck className="absolute inset-0 m-auto w-4 h-4 text-black" />
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Verifying Access
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Please wait while we verify your authentication.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
