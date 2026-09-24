import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    loginSubmit,
    navigate,
    showPassword,
    setShowPassword,
  } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <LogIn className="h-7 w-7 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to continue to your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(loginSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                {...register("email", {
                  required: "Email is required",
                  setValueAs: (value) => value.trim(),
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition
                  ${
                    errors.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
              />
            </div>

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

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
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full rounded-lg border bg-white py-3 pl-10 pr-11 text-sm outline-none transition
                  ${
                    errors.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="flex w-full items-center justify-center cursor-pointer gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <LogIn className="h-5 w-5" />
            Login
          </button>
        </form>

        {/* Register */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-blue-600 cursor-pointer hover:text-blue-700 hover:underline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
