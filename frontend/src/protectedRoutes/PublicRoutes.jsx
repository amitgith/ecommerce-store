import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  const { user, isLoading } = useSelector((store) => store.auth);
  if (isLoading) return <h1>Loading...</h1>;
  if (user) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};

export default PublicRoutes;
