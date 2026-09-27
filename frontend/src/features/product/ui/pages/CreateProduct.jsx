import React from "react";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router";
import { X } from "lucide-react";

const CreateProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Create Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Add a new product to your store
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/home")}
            className="rounded-lg border border-gray-200 bg-white p-2.5 text-gray-600 shadow-sm transition hover:bg-red-50 hover:text-red-600"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* Product Form */}
        <ProductForm />
      </div>
    </div>
  );
};

export default CreateProduct;
