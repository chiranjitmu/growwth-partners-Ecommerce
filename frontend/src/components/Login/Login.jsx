import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // validate with up library
  const emailSchema = yup
    .string()
    .required("Please Enter Your Email")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please Enter Valid Email");

  const passwordSchema = yup.string().required("Please Enter Your Password");

  // if validate then only go for submit else throw error
  const handleValidate = async () => {
    try {
      await emailSchema.validate(formData.email);
      await passwordSchema.validate(formData.password);
      handleSubmit();
    } catch (error) {
      if (
        error.message === "Please Enter Valid Email" ||
        error.message === "Please Enter Your Email"
      ) {
        setEmailError(true);
        setPasswordError(false);
        setFormData((prev) => ({
          ...prev,
          email: "",
        }));
        setErrorMessage(error.message);
      } else if (error.message === "Please Enter Your Password") {
        setPasswordError(true);
        setEmailError(false);
        setFormData((prev) => ({
          ...prev,
          password: "",
        }));
        setErrorMessage(error.message);
      }
    }
  };

  const handleSubmit = async () => {
    const result = await loginUser(formData);
    if (result) {
      setTimeout(() => {
        navigate("/");
      }, 2500);
      toast.success("Login Successfull", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder={emailError ? errorMessage : ""}
              className={`${emailError ? styles.error : styles.inputBox}`}
              onChange={handleChange}
              onClick={() => {
                setEmailError(false);
              }}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder={passwordError ? errorMessage : ""}
              className={`${passwordError ? styles.error : styles.inputBox}`}
              onChange={handleChange}
              onClick={() => {
                setPasswordError(false);
              }}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleValidate}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;