const Order = require("../models/order");

const createOrder = async (req, res) => {
  const { userId, products, totalAmount, deliveryAddress, paymentMethod } =
    req.body;
  try {
    const newOrder = await Order.create({
      userId,
      products,
      totalAmount,
      deliveryAddress,
      paymentMethod,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = { createOrder };
