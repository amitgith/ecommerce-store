import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { createProducts, updateProducts } from "../state/productAction";

export const useProduct = (product) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const createSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    let result;

    if (product) {
      result = await dispatch(
        updateProducts({
          id: product._id,
          data: formData,
        }),
      );

      if (updateProducts.fulfilled.match(result)) {
        reset();
        navigate("/home");
      }
    } else {
      result = await dispatch(createProducts(formData));

      if (createProducts.fulfilled.match(result)) {
        reset();
        navigate("/home");
      }
    }
  };

  return {
    dispatch,
    navigate,
    register,
    reset,
    handleSubmit,
    errors,
    createSubmit,
  };
};
