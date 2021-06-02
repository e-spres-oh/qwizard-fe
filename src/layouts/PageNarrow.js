import React from "react";
import classNames from "classnames";
import styles from "./PageNarrow.module.css";
import { Link } from "react-router-dom";

const PageNarrow = ({ children }) => {
  return (
    <div className={styles.narrowLayout}>
      <div
        className={classNames({
          "box-narrow": true,
        })}
      >
        <div
          className={classNames({
            [styles.pageNarrow]: true,
          })}
        >
          <div className={styles.topLeft}></div>
          <div className={styles.topRight}></div>
          <div className={styles.bottomLeft}></div>
          <div className={styles.bottomRight}></div>
          <div className={styles.bg}></div>
          <div className={styles.contentContainer}>
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
        </div>
      </div>
    </div>
  );
};

export default PageNarrow;
