import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    errors,
    registerSubmit,
    navigate,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <UserPlus className="h-7 w-7 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>

          <p className="mt-2 text-sm text-slate-500">
            Register to get started with your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(registerSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                {...register("name", {
                  required: "Name is required",
                  setValueAs: (value) => value.trim(),
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters are required",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 characters are required",
                  },
                  validate: (value) =>
                    typeof value === "string" || "Name must be a string",
                })}
                type="text"
                placeholder="Enter your name"
                className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                }`}
              />
            </div>

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

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
                className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
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
                placeholder="Create a password"
                className={`w-full rounded-lg border bg-white py-3 pl-10 pr-11 text-sm outline-none transition ${
                  errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600"
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

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    typeof value === "string" ||
                    "Confirm password must be a string",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters are required",
                  },
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className={`w-full  rounded-lg border bg-white py-3 pl-10 pr-11 text-sm outline-none transition ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700 active:scale-[0.98]"
          >
            <UserPlus className="h-5 w-5" />
            Create Account
          </button>
        </form>

        {/* Login */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-semibold text-green-600 hover:text-green-700 hover:underline cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
