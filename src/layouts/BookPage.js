import React from "react";
import styles from "./BookPage.module.css";
import classNames from "classnames";

const BookPage = ({ children, basic = false, logo = false }) => {
  return (
    <>
      <div
        className={classNames({
          "box-wide": true,
        })}
      >
        {logo && (
          <div className={styles.logo}>
            <img
              alt={"White Qwizard logo"}
              src={require("../static/svg/logoWhite.svg").default}
            />
          </div>
        )}
        <div
          style={{ marginTop: `${logo ? "3rem" : "10rem"}` }}
          className={styles.bookPage}
        >
          <div className={styles.arrowDown}></div>
          <div
            className={classNames({
              [styles.coverLeft]: true,
              [styles.black]: true,
            })}
          ></div>
          <div
            className={classNames({
              [styles.coverRight]: true,
              [styles.black]: true,
            })}
          ></div>
          <div
            className={classNames({
              [styles.spine]: true,
              [styles.black]: true,
            })}
          ></div>
          <div className={styles.pagesContainer}>
            <div
              className={classNames({
                [styles.coverLeft]: true,
                [styles.light]: true,
              })}
            ></div>
            <div
              className={classNames({
                [styles.coverRight]: true,
                [styles.light]: true,
              })}
            ></div>
            <div
              style={{ bottom: "-2.9rem" }}
              className={classNames({
                [styles.spine]: true,
                [styles.white]: true,
              })}
            ></div>
            <div className={styles.pagesBg}></div>
            <div className={styles.divider}></div>

            <div
              className={classNames({
                [styles.contentContainer]: true,
                [styles.basic]: basic,
              })}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookPage;
