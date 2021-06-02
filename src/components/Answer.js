import React from "react";
import styles from "./Answer.module.css";
import classNames from "classnames";

const Answer = ({ active, onClick, text, state, type }) => {
  return (
    <div
      onClick={onClick}
      className={classNames({
        [styles.answer]: true,
        [styles.active]: active,
        [styles.correct]: state && type,
        [styles.wrong]: state && !type,
      })}
    >
      <div className={classNames({ [styles.icon]: true })}></div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default Answer;
