import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Button from "../components/Button";
import Input from "../components/Input";
import PageNarrow from "../layouts/PageNarrow";
import styles from "./SelectHat.module.css";
import { fetchLobbyFromCode, HATS, createPlayer } from "../utils/request";
import { useHistory, useParams } from "react-router-dom";
import Auth from "../utils/auth";
import HatSlider from "../components/HatSlider";

const SelectHat = () => {
  const [lobby, setLobby] = useState();
  const [hat, setHat] = useState(0);

  const { code } = useParams();
  const history = useHistory();

  const onMount = useCallback(async () => {
    const { success, json: lobby } = await fetchLobbyFromCode(code);
    if (!success || lobby.status !== "pending") {
      history.push("/");
    }

    setLobby(lobby);

    const user = Auth.getUnauthenticatedUser();
    if (user) {
      setHat(user.hat);
      setUsername(user.username);
    }
  }, [code]);

  useEffect(() => onMount(), [onMount, code]);

  const [username, setUsername] = useState();

  const onJoin = async () => {
    const user = {
      username,
      hat:
        Object.keys(HATS).find((h) => HATS[h] === hat + 1) ||
        Object.keys(HATS)[0],
    };

    Auth.setUnauthenticatedUser(user);

    const { success, json: player } = await createPlayer({
      lobbyId: lobby.id,
      name: user.username,
      hat: user.hat,
    });

    Auth.setPlayer(lobby.code, player);

    if (success) history.push(`/game/${code}`);
  };

  return (
    <PageNarrow>
      <header className={styles.header}>
        <h4>Pick a proper wizard hat and a charming name</h4>
      </header>
      <HatSlider selectedHat={hat} onHatSelected={setHat} />

      <Input
        label={"Qwizard name"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className={styles.buttonContainer}>
        <Button color="turqouise" onClick={onJoin}>
          READY
        </Button>
      </div>
    </PageNarrow>
  );
};

export default SelectHat;
