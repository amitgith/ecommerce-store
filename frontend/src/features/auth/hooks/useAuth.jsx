import { useForm } from "react-hook-form";
export const useAuth = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const registerSubmit = (data) => {
    console.log(data);
    reset();
  };
  const loginSubmit = (data) => {
    console.log(data);
    reset();
  };
  return {
    register,
    handleSubmit,
    reset,
    errors,
    registerSubmit,
    loginSubmit,
  };
};
