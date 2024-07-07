const Product = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ errorMessage: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = { getProducts, getProductById };
