import React from "react";

import styles from "./TextArea.module.css";

const TextArea = ({ label, placeholder, onChange, value }) => {
  return (
    <>
      <label className={styles.label}>{label}</label>
      <textarea
        onChange={onChange}
        placeholder={placeholder}
        cols="29"
        rows="7"
        type={"textarea"}
        className={styles.textArea}
        value={value}
      ></textarea>
    </>
  );
};

export default TextArea;
