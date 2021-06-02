import React, { useEffect, useState } from "react";
import styles from "./HallOfFame.module.css";
import Leaderboard from "../components/Leaderboard";
import Button from "../components/Button";
import TopPlayers from "../components/TopPlayers";
import { Link, useParams } from "react-router-dom";
import { fetchLobbyScore, fetchQuiz } from "../utils/request";

const HallOfFame = ({ lobbyId, quizId }) => {
  useEffect(() => {
    onMount();
  }, []);

  const [score, setScore] = useState([]);
  const [quiz, setQuiz] = useState();

  const onMount = async () => {
    const { json: score } = await fetchLobbyScore(lobbyId);
    const { json: quiz } = await fetchQuiz(quizId);

    setScore(score.sort((a, b) => (a.points > b.points ? -1 : 1)));
    setQuiz(quiz);
  };

  return (
    <div className={styles.hallOfFameContentContainer}>
      <div className={"box-wide"}>
        <div className={styles.hallOfFame}>
          <Link to="/">
            <div className={styles.logo}>
              <img
                alt="qwizard logo"
                src={require("../static/svg/logo.svg").default}
              />
            </div>
          </Link>
          <div className={styles.contentContainer}>
            <h2 className={styles.title}>{quiz?.title} Hall of Fame</h2>
            <TopPlayers score={score} />
            {score.length > 3 && <Leaderboard score={score.slice(3)} />}
            <Link to="/library/current">
              <div className={styles.button}>
                <Button color={"purple"}>Enter a new quiz</Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HallOfFameScreen = () => {
  const { lobbyId, quizId } = useParams();
  return <HallOfFame lobbyId={lobbyId} quizId={quizId} />;
};

export default HallOfFame;
