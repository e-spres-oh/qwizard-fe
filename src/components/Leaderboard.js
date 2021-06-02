import React from "react";
import styles from "./Leaderboard.module.css";
import classNames from "classnames";
import Hat from "./Hat";

const Leaderboard = ({ score }) => {
  return (
    <div className={styles.leaderboard}>
      {score.map((entry, idx) => (
        <div
          key={idx}
          className={classNames({
            [styles.item]: true,
            [styles.highlighted]: idx % 3 === 0,
          })}
        >
          <div className={styles.player}>
            <div className={styles.imageContainer}>
              <Hat hat={entry.hat} />
            </div>
            <span className={styles.number}>{idx + 1}.</span>
            <span className={styles.name}>{entry.name}</span>
          </div>
          <div className={styles.score}>{entry.points}</div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
