import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../auth/state/authAction";

const Home = () => {
  const dispatch = useDispatch();
  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };
  return (
    <div className=" flex justify-between">
      <h1>Home Page</h1>
      <button
        onClick={handleLogoutUser}
        className="w-20 cursor-pointer bg-red-600 text-white rounded p-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
