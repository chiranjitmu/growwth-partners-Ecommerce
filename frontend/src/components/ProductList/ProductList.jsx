import React from "react";
import styles from "./ProductList.module.css";
import { useNavigate } from "react-router-dom";

function ProductList({ products, searchQuery, selectedCategory }) {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "All" || product.category === selectedCategory)
  );

  return (
    <section>
      <h1>Recommended</h1>
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className={styles.product}
            onClick={() => handleNavigate(product._id)}
          >
            <div>
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name.length > 13 ? `${product.name.slice(0, 13)}...` : product.name}</h2>
              <p>{product.price} ₹</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;
