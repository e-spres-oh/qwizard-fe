import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Hat from "../components/Hat";
import PageNarrow from "../layouts/PageNarrow";
import styles from "./Lobby.module.css";
import classNames from "classnames";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchPlayers,
  fetchQuiz,
  fetchLobbyFromCode,
  startLobby,
  fetchPlayer,
} from "../utils/request";
import Auth from "../utils/auth";
import { useToasts } from "react-toast-notifications";
import { pusher } from "../utils/pusher";

const Lobby = ({ onStart }) => {
  const { code } = useParams();
  const [quizData, setQuizData] = useState();
  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    return onMount();
  }, []);

  const onMount = async () => {
    const { json: lobby } = await fetchLobbyFromCode(code);
    const { json: quiz } = await fetchQuiz(lobby.quiz_id);
    let { json: players } = await fetchPlayers(lobby.id);
    const user = Auth.getUser();

    const lobbyChannel = pusher.subscribe(code);

    await lobbyChannel.bind("player_join", async (data) => {
      const { json: player } = await fetchPlayer(data.id);

      players.push(player);
      addToast(`${player.name} joined the party!`, { appearance: "success" });
      setQuizData({ ...quiz, players, lobby, user });
    });

    await lobbyChannel.bind("player_leave", async (data) => {
      const { json: player } = await fetchPlayer(data.id);

      players = players.filter((player) => {
        return player.id !== data.id;
      });

      addToast(`${player.name} left the party :( `, { appearance: "error" });

      setQuizData({ ...quiz, players, lobby, user });
    });

    lobbyChannel.bind("lobby_start", (_data) => {
      history.push(`${code}`);
    });

    setQuizData({ ...quiz, players, lobby, user });

    return () => {
      console.log("unsubscribe");
      lobbyChannel.unsubscribe();
    };
  };

  const start = async () => {
    const { success } = await startLobby(quizData.lobby.id);
    if (success) onStart();
  };

  if (!quizData || !quizData.lobby) return "LOADING";

  return (
    <PageNarrow>
      <h4>{quizData.title} Lobby</h4>
      <div className={styles.inviteDetails}>
        <img
          alt={"wizard hat"}
          src={require("../static/images/wandAndHat.png").default}
        />
        <div className={styles.inviteHeading}>
          <h6>
            Master Qwizard{" "}
            {quizData.lobby.quiz_master}{" "}
            summoned you for a battle of wits! Join a bewitching knowledge quiz!
          </h6>
        </div>
      </div>
      <div className={styles.instructions}>
        <h6>Secret spell code for others to join is</h6>
        <h6 className={"slim"}>(Relax. It’s not Abracadabra)</h6>
      </div>
      <div className={styles.link}>{code}</div>
      <Button color={"light-brown"}>Copy link to share</Button>
      <div className={styles.imageGrid}>
        <div className={"column-grid"}>
          {quizData.players.map((item) => (
            <div
              key={item.id}
              className={classNames("box-quarter", [styles.gridItem])}
            >
              <div className={styles.image}>
                <Hat hat={item.hat} />
              </div>
              <div className={styles.name}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <h6 className={classNames([styles.loading], "slim")}>
        Waiting for fellow qwizards...
      </h6>
      {quizData.user_id === quizData.user?.id && (
        <Button onClick={start} color={"purple"}>
          START
        </Button>
      )}
    </PageNarrow>
  );
};

export default Lobby;
