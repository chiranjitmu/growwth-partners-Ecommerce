import React from "react";
import styles from "./CategoryFilter.module.css";

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const categories = ["All", "Electronics", "Clothing", "Footwear", "Accessories"];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className={styles.filterContainer}>
      <label htmlFor="category" className={styles.filterLabel}>
        Filter by Category:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className={styles.filterSelect}
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
