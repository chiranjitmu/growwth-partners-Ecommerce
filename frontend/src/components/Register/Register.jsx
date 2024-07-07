import React, { useState } from "react";
import styles from "./Register.module.css";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  // validate with up library
  const nameSchema = yup
    .string()
    .matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/, "Only alphabets are allowed");

  const emailSchema = yup
    .string()
    .required("Please Enter Your Email")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please Enter Valid Email");

  const passwordSchema = yup
    .string()
    .required("Please Enter Your Password")
    .min(6, "Atleast 6 Char length");

  // if validate then only go for submit else throw error
  const handleValidate = async () => {
    try {
      await nameSchema.validate(formData.name);
      await emailSchema.validate(formData.email);
      await passwordSchema.validate(formData.password);
      handleSubmit();
    } catch (error) {
      if (error.message === "Only alphabets are allowed") {
        setNameError(true);
        setEmailError(false);
        setPasswordError(false);
        setPhoneNumberError(false);
        setFormData((prev) => ({
          ...prev,
          name: "",
        }));
        setErrorMessage(error.message);
      } else if (
        error.message === "Please Enter Valid Email" ||
        error.message === "Please Enter Your Email"
      ) {
        setEmailError(true);
        setNameError(false);
        setPasswordError(false);
        setPhoneNumberError(false);
        setFormData((prev) => ({
          ...prev,
          email: "",
        }));
        setErrorMessage(error.message);
      } else if (
        error.message === "Please Enter Your Password" ||
        error.message === "Atleast 6 Char length"
      ) {
        setPasswordError(true);
        setEmailError(false);
        setNameError(false);
        setPhoneNumberError(false);
        setFormData((prev) => ({
          ...prev,
          password: "",
        }));
        setErrorMessage(error.message);
      }
    }
  };

  const handleSubmit = async () => {
    const result = await registerUser(formData);
    if (result) {
      toast.success("Register Successfull", {
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
        navigate("/");
      }, 2500);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder={nameError ? errorMessage : ""}
              className={`${nameError ? styles.error : styles.inputBox}`}
              onChange={handleChange}
              onClick={() => {
                setNameError(false);
              }}
            />
          </div>

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

          <div className={styles.inputContainer}>
            <label htmlFor="phoneNumber" className={styles.label}>
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder={phoneNumberError ? errorMessage : ""}
              className={`${phoneNumberError ? styles.error : styles.inputBox}`}
              onChange={handleChange}
              onClick={() => {
                setPhoneNumberError(false);
              }}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleValidate}>
              Sign-Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
