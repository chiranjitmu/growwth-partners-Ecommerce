import React, { useState, useEffect } from "react";
import { createOrder } from "../../api/orderApi";
import styles from "./Checkout.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedAddress = localStorage.getItem("address") || "";
    setAddress(savedAddress);
    const total = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalAmount(total);
  }, []);

  const handleOrder = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const userId = JSON.parse(localStorage.getItem("userId"));
    const order = {
      userId: userId,
      products: cart,
      totalAmount: totalAmount,
      deliveryAddress: address,
      paymentMethod: paymentMethod,
      navigate,
    };
    if (cart.length === 0) {
      toast.error("Select Products for Payment", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (address === "") {
      toast.error("Add Address", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (paymentMethod === "") {
      toast.error("Select a payment method", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      createOrder(order).then(() => {
        toast.success("Order placed successfully", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          localStorage.removeItem("cart");
          navigate("/");
        }, 2000);
      });
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    localStorage.setItem("address", e.target.value);
  };

  const handleNewAddress = () => {
    localStorage.removeItem("address");
    setAddress("");
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.checkout}>
        <h1>Checkout</h1>
        <div className={styles.addressContainer}>
          <label>
            Address:
            <input type="text" value={address} onChange={handleAddressChange} />
          </label>
          <button
            onClick={handleNewAddress}
            style={{ width: "10rem", height: "auto", marginTop: "2rem" }}
          >
            New Address
          </button>
        </div>
        <label>
          Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cashOnDelivery">Cash on Delivery</option>
          </select>
        </label>
        <h2>Total Amount: ₹{totalAmount.toFixed(2)}</h2>
        <button onClick={handleOrder}>Place Your Order</button>
      </div>
    </>
  );
}

export default Checkout;
