import React from "react";
import styles from "./Inbetween.module.css";
import Counter from "../components/Counter";

const InbetweenCounter = ({ onComplete }) => {
  return (
    <div className={styles.inbetween}>
      <div className={styles.bg}></div>
      <div className={"box-wide"}>
        <div className={styles.inbetweenContentContainer}>
          <div className={styles.logo}>
            <img
              alt={"White Qwizard logo"}
              src={require("../static/svg/logoWhite.svg").default}
            />
          </div>
          <Counter onComplete={onComplete} />
        </div>
      </div>
    </div>
  );
};

export default InbetweenCounter;
