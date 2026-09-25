import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../state/authAction";
import { useNavigate } from "react-router";
import { useState } from "react";
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const registerSubmit = (data) => {
    console.log(data);
    dispatch(registerUser(data));
    reset();
  };
  const loginSubmit = async (data) => {
    console.log(data);
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      const user = result.payload.user;
      if (user.role === "user") {
        navigate("/home/user");
      }
      if (user.role === "seller") {
        navigate("/home/seller");
      }
    }
    reset();
  };
  return {
    register,
    handleSubmit,
    reset,
    errors,
    registerSubmit,
    loginSubmit,
    navigate,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
};
