import { useAuth } from "../../hooks/useAuth";
const Login = () => {
  const { register, handleSubmit, reset, errors, loginSubmit } = useAuth();
  return (
    <div className="flex flex-col gap-2 p-2">
      <h1 className="text-xl font-bold">Login Page</h1>
      <form
        onSubmit={handleSubmit(loginSubmit)}
        className="w-90 flex flex-col gap-5"
      >
        <input
          {...register("email", {
            required: "Email is required",
            setValueAs: (value) => value.trim(),
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address",
            },
          })}
          className="border border-black rounded p-2"
          type="email"
          placeholder="Enter Your Email"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        <input
          {...register("password", {
            required: "Password is required",
            validate: (value) =>
              typeof value === "string" || "Password must be a string",
            minLength: {
              value: 8,
              message: "Minimum 8 characters are required",
            },
          })}
          className="border border-black rounded p-2"
          type="password"
          placeholder="Enter Your Password"
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
        <button className="bg-blue-600 text-white rounded p-2 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
