import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getAllProducts } from "../../state/productAction";

const ProductCard = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((store) => store.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>All Products</h1>
      {products.map((product) => (
        <div key={product._id}>
          <img src={product.images} alt="" />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price:- {product.price}</p>
          <div className="flex justify-between ">
            <button className="bg-sky-600 rounded text-white p-2 cursor-pointer">
              Update
            </button>
            <button className="bg-green-600 rounded text-white p-2 cursor-pointer">
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteProducts())}
              className="bg-red-600 rounded text-white p-2 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
