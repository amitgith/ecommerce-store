import React, { useEffect } from "react";

import {
  Package,
  FileText,
  IndianRupee,
  ImagePlus,
  ArrowLeft,
  Save,
} from "lucide-react";
import { useProduct } from "../../hooks/useProduct";

const ProductForm = ({ product }) => {
  const { register, reset, handleSubmit, errors, createSubmit } =
    useProduct(product);

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
      });
    }
  }, [product, reset]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Form Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
          <form onSubmit={handleSubmit(createSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Package size={17} className="text-indigo-600" />
                Product Title
              </label>

              <input
                type="text"
                placeholder="Enter product title"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters are required",
                  },
                  maxLength: {
                    value: 100,
                    message: "Maximum 100 characters are allowed",
                  },
                })}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                  errors.title
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />

              {errors.title && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText size={17} className="text-indigo-600" />
                Product Description
              </label>

              <textarea
                rows={5}
                placeholder="Enter product description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Minimum 20 characters are required",
                  },
                  maxLength: {
                    value: 500,
                    message: "Maximum 500 characters are allowed",
                  },
                })}
                className={`w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                  errors.description
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />

              {errors.description && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <IndianRupee size={17} className="text-indigo-600" />
                Product Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>

                <input
                  type="number"
                  placeholder="Enter product price"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 1,
                      message: "Price must be greater than 0",
                    },
                  })}
                  className={`w-full rounded-lg border py-3 pl-9 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                    errors.price
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />
              </div>

              {errors.price && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ImagePlus size={17} className="text-indigo-600" />
                Product Image
              </label>

              <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30">
                <ImagePlus size={35} className="mx-auto mb-3 text-gray-400" />

                <p className="text-sm font-medium text-gray-700">
                  Upload product image
                </p>

                <p className="mt-1 text-xs text-gray-500">PNG, JPG or JPEG</p>

                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: product ? false : "Image is required",
                  })}
                  className="mt-4 block w-full cursor-pointer text-sm text-gray-600 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-600 hover:file:bg-indigo-100"
                />
              </div>

              {errors.image && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.image.message}
                </p>
              )}

              {product && (
                <p className="mt-2 text-xs text-gray-500">
                  Leave the image empty if you don't want to change the existing
                  image.
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                <Save size={17} />
                {product ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
