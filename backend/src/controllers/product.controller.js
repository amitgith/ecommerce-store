import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const filesUrls = [];
  for (let i = 0; i < req.files.length; i++) {
    const response = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalname,
    });
    filesUrls.push(response.url);
  }
  console.log(filesUrls);
  const product = await productModel.create({
    title: req.body.title,
    description: req.body.description,
    price: {
      amount: req.body.price.amount,
      currency: req.body.price.currency,
    },
    sizes: req.body.sizes,
    images: filesUrls,
    seller: req.user.userId,
  });
  res.status(201).json({
    message: "Product created successfully",
    data: {
      product,
    },
  });
};

export const listAllProducts = async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({
    message: "Products data fetched successfully",
    data: {
      products,
    },
  });
};
export const getSingleProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    res.status(200).json({
      message: "Single Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const body = req.body;
    const productUpdate = await productModel.findByIdAndUpdate(productId, body);
    return res.status(200).json({
      message: "Product updated successfully",
      data: productUpdate,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    await productModel.findByIdAndDelete(productId);
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
