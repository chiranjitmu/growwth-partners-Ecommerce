import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import ProductList from "../../components/ProductList/ProductList";
import Navbar from "../../components/Navbar/Navbar";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(navigate).then((data) => setProducts(data));
  }, [navigate]);

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductList products={products} searchQuery={searchQuery} selectedCategory={selectedCategory} />
    </div>
  );
}

export default Home;
