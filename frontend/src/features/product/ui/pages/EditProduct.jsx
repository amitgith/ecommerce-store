import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Package } from "lucide-react";

import ProductForm from "../components/ProductForm";
import { getProductById } from "../../state/productAction";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProduct, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />

          <p className="text-sm text-gray-500">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
          <Package
            size={45}
            className="mx-auto mb-4 text-gray-400"
          />

          <h2 className="text-lg font-semibold text-gray-900">
            Product Not Found
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            The product you are trying to edit does not exist.
          </p>

          <button
            onClick={() => navigate("/home")}
            className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="rounded-lg border border-gray-200 bg-white p-2.5 text-gray-600 shadow-sm transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Back"
          >
            <ArrowLeft size={21} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Edit Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update your product information
            </p>
          </div>
        </div>

        {/* Product Form */}
        <ProductForm product={selectedProduct} />
      </div>
    </div>
  );
};

export default EditProduct;
