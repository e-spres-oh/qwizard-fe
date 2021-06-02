import React from "react";
import Hat from "./Hat";
import styles from "./TopPlayers.module.css";

const FRAMES = {
  0: "Red",
  1: "Blue",
  2: "Green",
};

const TopPlayers = ({ score }) => {
  return (
    <div className={styles.topPlayers}>
      {score.slice(0, 3).map((entry, idx) => (
        <div key={idx} className={styles.item}>
          <div className={styles.contentContainer}>
            <div className={styles.imageContainer}>
              <Hat hat={entry.hat} />
            </div>
            <div className={styles.name}>{entry.name}</div>
            <div className={styles.score}>{entry.points}</div>
            <div className={styles.itemFrame}>
              <img
                alt={"A green painting frame"}
                src={require(`../static/svg/frame${FRAMES[idx]}.svg`).default}
              />
            </div>
            <div className={styles.rubyContainer}>
              <img
                className={styles.ruby}
                alt={"A yellow ruby"}
                src={require(`../static/svg/top${idx + 1}.svg`).default}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopPlayers;
