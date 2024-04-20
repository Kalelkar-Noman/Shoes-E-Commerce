import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { OrderHistory } from "../models/orderHistory.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.body._id;
  if (!userId) {
    throw new ApiError(400, "User Id is required");
  }
  const user = await User.findById(userId).populate("orderHistory"); // Populates the orderHistory field

  return res
    .status(201)
    .json(new ApiResponse(200, user, "Product Added Successfully"));
});

const addOrderHistory = asyncHandler(async (req, res) => {
  const { userId, items, totalPrice } = req.body;

  if (!userId || !items || !totalPrice) {
    console.log(userId, items, totalPrice);
    throw new ApiError(400, "All fields are required");
  }

  const newOrderHistory = await OrderHistory.create({
    user: userId,
    items,
    totalPrice,
    orderPlacedAt: null,
  });
  const addedOrderHistory = await OrderHistory.findById(newOrderHistory._id);
  if (!addedOrderHistory) {
    throw new ApiError(500, "Something went wrong while adding Order History");
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        addedOrderHistory,
        "Order History Added Successfully"
      )
    );
});

export { getUserOrders, addOrderHistory };
