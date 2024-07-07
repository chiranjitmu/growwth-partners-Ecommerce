import React, { useRef, useState, useEffect } from "react";
import styles from "./Auth.module.css";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

const Auth = () => {
  const [open, setOpen] = useState(true);
  const loginRef = useRef(null);
  const signupRef = useRef(null);

  useEffect(() => {
    if (signupRef.current && loginRef.current) {
      if (open) {
        signupRef.current.classList.add(styles.boxShadow);
        loginRef.current.classList.remove(styles.boxShadow);
      } else {
        loginRef.current.classList.add(styles.boxShadow);
        signupRef.current.classList.remove(styles.boxShadow);
      }
    }
  }, [open]);

  return (
    <main className={styles.container}>
      <section className={styles.auth}>
        <h1 className={styles.header}>Ecommerce</h1>
        <div className={styles.button}>
          <button
            className={styles.signUp}
            onClick={() => {
              setOpen(true);
            }}
            ref={signupRef}
          >
            Sign Up
          </button>
          <button
            className={styles.logIn}
            onClick={() => {
              setOpen(false);
            }}
            ref={loginRef}
          >
           Sign In
          </button>
        </div>
        {!open ? (
          <div>
            <Login />
          </div>
        ) : (
          <div>
            <Register setOpen={setOpen} />
          </div>
        )}
      </section>
    </main>
  );
};

export default Auth;