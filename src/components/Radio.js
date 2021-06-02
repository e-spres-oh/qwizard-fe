import React from "react";
import classNames from "classnames";
import styles from "./Radio.module.css";

const Radio = ({ label, text }) => {
  return (
    <div className={styles.radio}>
      <div className={styles.label}>{label}</div>
      <div className={styles.contentContainer}>
        <div className={styles.radioInputContainer}>
          <input type="radio" className={styles.radioInput}></input>
          <div className={styles.checkmark}></div>
        </div>
        <label className={styles.text}>{text}</label>
      </div>
    </div>
  );
};

export default Radio;
