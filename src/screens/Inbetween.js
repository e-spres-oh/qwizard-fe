import React, { useEffect, useState } from "react";
import styles from "./Inbetween.module.css";
import LeaderBoard from "../components/Leaderboard";
import { fetchLobbyScore } from "../utils/request";

const Inbetween = ({ lobbyId, questionIndex, totalQuestions }) => {
  useEffect(() => {
    onMount();
  }, []);

  const [score, setScore] = useState([]);

  const onMount = async () => {
    const { json: score } = await fetchLobbyScore(lobbyId);

    setScore(score);
  };

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
          <>
            <h1 className={styles.heading}>Time's up</h1>
            <h3 className={styles.count}>
              {questionIndex} / {totalQuestions}
              <br />
              Scoreboard
            </h3>
            <LeaderBoard score={score} />
          </>
        </div>
      </div>
    </div>
  );
};

export default Inbetween;
