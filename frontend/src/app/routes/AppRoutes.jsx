import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Login from "../../features/auth/ui/pages/Login";
import Register from "../../features/auth/ui/pages/Register";
import { useDispatch } from "react-redux";
import {
  currentLoggedUser,
  refreshAccessToken,
} from "../../features/auth/state/authAction";
import PublicRoutes from "../../protectedRoutes/PublicRoutes";
import AuthLayout from "../../layouts/AuthLayout";
import ProtectedRoutes from "../../protectedRoutes/ProtectedRoutes";
import DashboardLayout from "../../layouts/DashboardLayout";
import { commonRoutes } from "../routes/commonRoutes";
import RoleBaseRoute from "../../protectedRoutes/RoleBaseRoute";
import { userRoutes } from "../routes/userRoutes";
import { sellerRoutes } from "../routes/sellerRoutes";
const AppRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const restoreUser = async () => {
      const result = await dispatch(refreshAccessToken());

      if (refreshAccessToken.fulfilled.match(result)) {
        dispatch(currentLoggedUser());
      }
    };

    restoreUser();
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoutes />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            ...commonRoutes,

            {
              path: "user",
              element: <RoleBaseRoute allowedRoles={["user"]} />,
              children: userRoutes,
            },
            {
              path: "seller",
              element: <RoleBaseRoute allowedRoles={["seller"]} />,
              children: sellerRoutes,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
