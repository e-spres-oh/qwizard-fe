import React from "react";
import classNames from "classnames";
import styles from "./AnswerPreview.module.css";

const AnswerPreview = ({
  id,
  text,
  active,
  onClick,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <div
        onClick={() => onClick(id)}
        className={classNames({
          [styles.answerPreview]: true,
          [styles.active]: active,
        })}
      >
        <div className={classNames({ [styles.icon]: true })}></div>
        <input
          value={text}
          onChange={onChange}
          type="text"
          className={styles.text}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default AnswerPreview;
