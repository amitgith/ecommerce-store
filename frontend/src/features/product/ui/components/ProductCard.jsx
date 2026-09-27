import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getAllProducts } from "../../state/productAction";
import { useNavigate } from "react-router";
import { Pencil, Trash2, PackageOpen } from "lucide-react";

const ProductCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
          <p className="text-sm text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              All Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and view all your products
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200">
            <PackageOpen size={18} className="text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">
              {products?.length || 0} Products
            </span>
          </div>
        </div>

        {/* Empty State */}
        {!products?.length ? (
          <div className="flex min-h-100 flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
            <PackageOpen size={48} className="mb-4 text-gray-400" />

            <h2 className="text-lg font-semibold text-gray-900">
              No Products Found
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              There are currently no products available.
            </p>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Product Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Content */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-lg font-semibold text-gray-900">
                    {product.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mt-4">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
                    <button
                      onClick={() =>
                        navigate(`/home/products/edit/${product._id}`)
                      }
                      className="flex flex-1 items-center cursor-pointer justify-center gap-2 rounded-lg bg-indigo-50 px-3 py-2.5 text-sm font-medium text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => dispatch(deleteProducts(product._id))}
                      className="flex flex-1 items-center justify-center cursor-pointer gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
