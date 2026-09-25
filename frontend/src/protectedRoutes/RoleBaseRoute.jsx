import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
const RoleBaseRoute = ({ allowedRoles }) => {
  let { user } = useSelector((store) => store.auth);
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleBaseRoute;
