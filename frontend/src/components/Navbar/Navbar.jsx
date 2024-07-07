import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">E-Shop</Link>
      </div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <p onClick={handleLogout} className={styles.logout}>Logout</p>
      </div>
    </nav>
  );
}

export default Navbar;
