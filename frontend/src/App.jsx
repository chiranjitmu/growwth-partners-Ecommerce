import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/AuthPage/Auth";
import HomePage from "./pages/HomePage/Home";
import NotFound from "./pages/ErrorPage/NotFound";
import Product from './pages/ProductsPage/Products';
import CheckoutPage from "./pages/Checkout/Checkout";
import CartPage from "./pages/CartPage/Cart";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={HomePage} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
