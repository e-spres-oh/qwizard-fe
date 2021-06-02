import React from "react";
import classNames from "classnames";
import styles from "./Divider.module.css";

const Divider = () => {
  return (
    <div className={styles.dividerContainer}>
      <div className={styles.left}></div>
      <div className={styles.text}>Or</div>
      <div className={styles.right}></div>
    </div>
  );
};

export default Divider;
