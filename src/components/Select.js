import React from "react";
import styles from "./Select.module.css";

const Select = ({ data, onChange, value }) => {
  return (
    <>
      <label className={styles.label}>{data.label}</label>
      <div className={styles.selectContainer}>
        <select value={value} onChange={onChange} className={styles.select}>
          {data.options.map((o) => (
            <option value={o.value} key={o.text}>
              {o.text}
            </option>
          ))}
        </select>
        <div className={styles.arrow} />
      </div>
    </>
  );
};

export default Select;
