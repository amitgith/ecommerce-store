import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Login from "../../features/auth/ui/pages/Login";
import Register from "../../features/auth/ui/pages/Register";
import { useDispatch } from "react-redux";
import { currentLoggedUser, refreshAccessToken } from "../../features/auth/state/authAction";
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
