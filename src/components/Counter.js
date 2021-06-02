import React, { useEffect } from "react";
import styles from "./Counter.module.css";
import classNames from "classnames";

const Counter = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.counter}>
      <div className={styles.topText}>
        <h1>Get your wands ready</h1>
      </div>
      <div className={styles.numbers}>
        <div
          className={classNames({
            [styles.number]: true,
            [styles.first]: true,
          })}
        >
          3
        </div>
        <div
          className={classNames({
            [styles.number]: true,
            [styles.second]: true,
          })}
        >
          2
        </div>
        <div
          className={classNames({
            [styles.number]: true,
            [styles.third]: true,
          })}
        >
          1
        </div>
      </div>
      <div className={styles.bottomText}>
        <h1>A witty question is being cast...</h1>
      </div>
    </div>
  );
};

export default Counter;
