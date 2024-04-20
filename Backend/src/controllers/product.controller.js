import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addProduct = asyncHandler(async (req, res) => {
  const {
    productName,
    price,
    description,
    rating,
    image,
    category,
    otherImages,
  } = req.body;

  if (
    [productName, description, category, image].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const newProduct = await Product.create({
    productName,
    price,
    description,
    rating,
    image,
    category,
    otherImages,
  });
  const addedProduct = await Product.findById(newProduct._id);
  if (!addedProduct) {
    throw new ApiError(500, "Something went wrong while adding product");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, addedProduct, "Product Added Successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const productId = req.body._id;
  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }
  const foundProduct = await Product.findOne({ _id: productId });
  if (!foundProduct) {
    throw new ApiError(404, "Product not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, foundProduct, "Product Fetched Successfully"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const foundProduct = await Product.find();
  if (!foundProduct) {
    throw new ApiError(404, "No Products Found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, foundProduct, "Products Fetched Successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    id,
    productName,
    category,
    price,
    description,
    rating,
    image,
    otherImages,
  } = req.body;

  if (!id || !productName || !price || !description || !category || !image) {
    throw new ApiError(400, "All fields are required");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        productName,
        price,
        description,
        rating: rating ? rating : "4.9",
        image,
        category,
        otherImages,
      },
    },
    { new: true }
  ).select();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedProduct,
        "product details updated successfully"
      )
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "product deleted successfully"));
});
export {
  addProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
