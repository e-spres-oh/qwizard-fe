import React from "react";
import styles from "./Input.module.css";

const Input = ({ label, placeholder, field, onChange, value, type }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        type={type || "text"}
        {...field}
        value={value}
      />
    </div>
  );
};

export default Input;
