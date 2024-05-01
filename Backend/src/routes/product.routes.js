import { Router } from "express";
import {
  addProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductByName,
  getProductByCategory,
} from "../controllers/product.controller.js";
const router = Router();
// product routes
router.route("/addproduct").post(addProduct);
router.route("/getproductbyid").get(getProductById);
router.route("/getproductbyname").get(getProductByName);
router.route("/getproductbycategory").get(getProductByCategory);
router.route("/getallproducts").get(getAllProducts);
router.route("/updateproduct").patch(updateProduct);
router.route("/deleteproduct").patch(deleteProduct);
export default router;
