const express = require("express");
const productController = require("../controllers/product");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/getproduct", verifyToken, productController.getProducts);
router.get(
  "/getproductById/:id",
  verifyToken,
  productController.getProductById
);

module.exports = router;
