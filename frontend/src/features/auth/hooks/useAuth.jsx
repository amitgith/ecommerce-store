import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../state/authAction";
import { useNavigate } from "react-router";
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const loginSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
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
  };
};
