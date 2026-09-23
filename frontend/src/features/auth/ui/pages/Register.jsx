import { useAuth } from "../../hooks/useAuth";
const Register = () => {
  const { register, handleSubmit, reset, errors, registerSubmit, navigate } =
    useAuth();
  return (
    <div className="flex flex-col gap-2 p-2">
      <h1 className="text-xl font-bold">Register Page</h1>
      <form
        onSubmit={handleSubmit(registerSubmit)}
        className="w-90 flex flex-col gap-5"
      >
        <input
          {...register("name", {
            required: "Name is required",
            setValueAs: (value) => value.trim(),
            minLength: {
              value: 3,
              message: "Minimun 3 characters are required",
            },
            maxLength: {
              value: 20,
              message: "Maximum 20 characters are required",
            },
            validate: (value) =>
              typeof value === "string" || "Name must be a string",
          })}
          className="border border-black rounded p-2"
          type="text"
          placeholder="Enter Your Name"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
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
        <input
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              typeof value === "string" || "Confirm password must be a string",
            minLength: {
              value: 8,
              message: "Minimum 8 characters are required",
            },
          })}
          className="border border-black rounded p-2"
          type="password"
          placeholder="Enter Your Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="text-red-600">{errors.confirmPassword.message}</p>
        )}
        <button className="bg-green-600 text-white rounded p-2 cursor-pointer">
          Create
        </button>
        <p>Already have an account  </p>
      </form>
    </div>
  );
};

export default Register;
