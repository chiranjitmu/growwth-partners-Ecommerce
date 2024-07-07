import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductDetails.module.css";

function ProductDetails({ product }) {
  const navigate = useNavigate();

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(item => item._id === product._id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div className={styles.productDetails}>
      <div>
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price} ₹</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetails;
