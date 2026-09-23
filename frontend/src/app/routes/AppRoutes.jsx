import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Login from "../../features/auth/ui/pages/Login";
import Register from "../../features/auth/ui/pages/Register";
const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
