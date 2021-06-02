import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = ({ children }) => {
  return (
    <div className={styles.sidebar}>
      <Link to="/">
        <div className={styles.logo}>
          <img
            alt="qwizard logo"
            src={require("../static/svg/logo.svg").default}
          />
        </div>
      </Link>

      {children}
    </div>
  );
};

export default Sidebar;
