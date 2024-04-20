import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
  });
  // state: "No Value",
  // city: "No Value",
  // country: "No Value",
  // zipcode: 0,
  // phonenumber: 0,
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email);

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $and: [{ email }, { password }],
  }); // $or: [{ username }, { email }],

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const loggedInUser = await User.findById(user._id).select("-password");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
      },
      "User logged In Successfully"
    )
  );
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const {
    username,
    password,
    email,
    city,
    country,
    phonenumber,
    state,
    zipcode,
  } = req.body;

  if (!username || !password || !email) {
    throw new ApiError(400, "All fields are required");
  }
  console.log(req.body?.id);

  const user = await User.findByIdAndUpdate(
    // city: city.toLowerCase().trim(),
    // state: state.toLowerCase().trim(),
    // country: country.toLowerCase().trim(),
    req.body?.id,
    {
      $set: {
        username,
        email,
        password,
        city,
        state,
        country,
        zipcode,
        phonenumber,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

export { registerUser, loginUser, updateAccountDetails };
