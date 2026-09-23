import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Login from "../../features/auth/ui/pages/Login";
import Register from "../../features/auth/ui/pages/Register";
import { useDispatch } from "react-redux";
import { currentLoggedUser } from "../../features/auth/state/authAction";
const AppRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (() => {
      dispatch(currentLoggedUser());
    })();
  }, []);
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
