import React from "react";
import styles from "./Button.module.css";

const Button = ({
  onClick,
  color,
  children,
  textColor,
  borderColor,
  outline,
  fluid,
  type,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: `var(--${color || "transparent"} )`,
        color: `var(--${textColor || "white"})`,
        border: outline ? `.2rem solid var(--${borderColor || "black"})` : "",
        width: fluid ? "100%" : "initial",
        opacity: disabled ? "0.5" : 1,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
