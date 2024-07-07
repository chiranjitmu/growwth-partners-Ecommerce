const express = require("express");
const orderController = require("../controllers/order");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/create", verifyToken, orderController.createOrder);

module.exports = router;
