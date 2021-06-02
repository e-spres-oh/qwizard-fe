import React from "react";
import styles from "./Toast.module.css";

const Toast = ({ headline, text, color }) => {
  return (
    <div
      style={{ backgroundColor: `var(--${color})` }}
      className={styles.toast}
    >
      <h2 className={styles.headline}>{headline}</h2>
      <h4 className={styles.text}>{text}</h4>
    </div>
  );
};

export default Toast;
