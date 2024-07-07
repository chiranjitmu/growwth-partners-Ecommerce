import React from "react";
import styles from "./NotFound.module.css";
import { TfiFaceSad } from "react-icons/tfi";

const NotFound = () => {
  return (
    <main className={styles.container}>
      <TfiFaceSad className={styles.sadIcon} />
      <div className={styles.para}>
        <h1>404 Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
        <p>
          You can <a href="/">return to the homepage</a>
        </p>
      </div>
    </main>
  );
};

export default NotFound;