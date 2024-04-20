import { Router } from "express";
import {
  addProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
const router = Router();
router.route("/addproduct").post(addProduct);
router.route("/getproductbyid").get(getProductById);
router.route("/getproductbyid").get(getProductById);
router.route("/getallproducts").get(getAllProducts);
router.route("/updateproduct").patch(updateProduct);
router.route("/deleteproduct").patch(deleteProduct);
export default router;
