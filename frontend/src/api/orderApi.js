import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleError = (error, navigate) => {
  if (
    error.response.data?.errorMessage === "Unauthorized access! Invalid token"
  ) {
    toast.error(error.response.data?.errorMessage, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      navigate("/auth");
      localStorage.removeItem("token");
    }, 3500);
  } else if (error.response.data?.errorMessage) {
    toast.error(error.response.data?.errorMessage, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return;
  } else {
    toast.error("Something went wrong", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

export const createOrder = async ({
  userId,
  products,
  totalAmount,
  deliveryAddress,
  paymentMethod,
  navigate,
}) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKENDURL}/orders/create`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, {
      userId,
      products,
      totalAmount,
      deliveryAddress,
      paymentMethod,
    });
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

export const getOrderById = async (orderId, navigate) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKENDURL}/orders/${orderId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};
