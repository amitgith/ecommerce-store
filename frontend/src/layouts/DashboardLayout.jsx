import React from "react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
