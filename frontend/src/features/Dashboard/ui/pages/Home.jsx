import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../auth/state/authAction";
import ProductCard from "../../../product/ui/components/ProductCard";
import { useNavigate } from "react-router";
import { LogOut, Plus, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutUser = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      toast.success("Logged out successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-100 p-2.5">
              <ShoppingBag size={22} className="text-indigo-600" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Products
              </h1>

              <p className="hidden text-sm text-gray-500 sm:block">
                Manage your products
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate("/home/products/create")}
              className="flex items-center gap-2 cursor-pointer rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98] sm:px-4"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Create Product</span>
            </button>

            <button
              type="button"
              onClick={handleLogoutUser}
              className="flex items-center gap-2 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:px-4"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Products */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductCard />
      </main>
    </div>
  );
};

export default Home;
