import React, { useEffect, useRef, useState } from "react";
import BookPage from "../layouts/BookPage";
import classNames from "classnames";
import styles from "./QuizLibrary.module.css";
import Button from "../components/Button";
import { Link, useHistory, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SideMenu from "../components/SideMenu";
import {
  fetchCurrentQuizzes,
  fetchPastQuizzes,
  createQuiz,
  deleteQuiz,
  createLobby,
  logout,
  createPlayer,
  host,
} from "../utils/request";
import Auth from "../utils/auth";

const QuizLibrary = () => {
  const { type } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [lobbies, setLobbies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    loadData();
  }, [type]);

  const loadData = async () => {
    if (type === "current") {
      const { success, json } = await fetchCurrentQuizzes();
      if (success) setQuizzes(json);
    } else {
      const { success, json } = await fetchPastQuizzes();
      if (success) setLobbies(json);
    }
  };

  const onDeleteQuiz = async (id) => {
    await deleteQuiz(id);
    loadData();
  };

  const onCreateQuizClick = async () => {
    const { success, json } = await createQuiz({ title: "untitled" });
    if (success) history.push(`/quiz/${json.id}/create/question/1`);
  };

  const onCreateLobby = async (id) => {
    const { success, json: lobby } = await createLobby({
      status: "pending",
      quizId: id,
    });

    if (success && lobby.code) {
      const { username, hat } = Auth.isLoggedIn()
        ? Auth.getUser()
        : Auth.getUnauthenticatedUser();

      const { success: playerSuccess, json: player } = await createPlayer({
        lobbyId: lobby.id,
        name: username,
        hat,
      });

      Auth.setPlayer(lobby.code, player);

      if (playerSuccess) history.push(`/game/${lobby.code}`);
    }
  };

  const onLogout = () => {
    logout();
    history.push("/");
  };

  const _renderCurrentQuizzes = () => {
    return quizzes.map((q) => (
      <div
        key={q.id}
        className={classNames({ [styles.item]: true, "box-third": true })}
      >
        <div className={styles.quizThumb}>
          <img
            alt={"Quiz name thumb"}
            src={
              q.image_url
                ? `${host()}${q.image_url}`
                : require("../static/svg/placeholder.svg").default
            }
            className={classNames({
              "responsive-image": true,
            })}
          />
        </div>
        <h6 className={styles.text}>{q.title}</h6>
        <div className={styles.buttonContainer}>
          <Button
            type={"button"}
            onClick={() => onCreateLobby(q.id)}
            color={"turqouise"}
          >
            CREATE LOBBY
          </Button>
        </div>
        <button
          type="button"
          onClick={() => onDeleteQuiz(q.id)}
          className={styles.delete}
        >
          <img
            className={styles.icon}
            alt={"Trash can icon"}
            src={require("../static/svg/trashDark.svg").default}
          />
        </button>
      </div>
    ));
  };

  const _renderPastQuizzes = () =>
    lobbies.map((lobby) => (
      <div
        key={lobby.id}
        className={classNames({ [styles.item]: true, "box-third": true })}
      >
        <div className={styles.quizThumb}>
          <img
            alt={"Quiz name thumb"}
            src={require("../static/svg/placeholder.svg").default}
            className={classNames({
              "responsive-image": true,
            })}
          />
        </div>
        <h6 className={styles.text}>{lobby.quiz.title}</h6>
        <div className={styles.buttonContainer}>
          <Link
            to={`/lobbies/${lobby.id}/quizzes/${lobby.quiz_id}/hall-of-fame`}
          >
            <Button color={"turqouise"}>Hall Of Fame</Button>
          </Link>
        </div>
      </div>
    ));

  if (!quizzes) return "LOADING";

  return (
    <BookPage>
      <Sidebar>
        <SideMenu
          items={[
            { id: 1, text: "Your Quizes", path: "/library/current" },
            { id: 2, text: "Past quizes taken", path: "/library/past" },
          ]}
        />
      </Sidebar>
      <div className={styles.quizLibrary}>
        <div className={styles.settingsContainer}>
          <Link to="/user">
            <div className={styles.settings}>
              <img
                className={styles.settingsIcon}
                alt={"Wizard head with a wizard hat"}
                src={require("../static/svg/wizardHead.svg").default}
              />
              <div>User settings</div>
            </div>
          </Link>
          <div onClick={onLogout} className={styles.logout}>
            <img
              alt={"A door and an arrow suggesting exit"}
              src={require("../static/svg/logout.svg").default}
            />
          </div>
        </div>

        <div className={"column-grid"}>
          <div
            className={classNames({
              [styles.item]: true,
              "box-third": true,
            })}
          >
            <div
              className={classNames({
                [styles.create]: true,
                [styles.quizThumb]: true,
              })}
            >
              <h4 className={styles.title}>New Quiz</h4>
            </div>
            <h6 className={styles.text}>Create an enchanting quiz</h6>

            <div className={styles.buttonContainer}>
              <Button onClick={onCreateQuizClick} color={"turqouise"}>
                CREATE
              </Button>
            </div>
          </div>
          {type === "current" ? _renderCurrentQuizzes() : _renderPastQuizzes()}
        </div>
      </div>
    </BookPage>
  );
};

export default QuizLibrary;
