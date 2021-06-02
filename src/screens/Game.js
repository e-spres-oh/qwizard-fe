import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import {
  fetchAnswers,
  fetchLobbyFromCode,
  fetchQuestions,
  answerQuestion,
  fetchPlayersThatAnsweredQuestion,
} from "../utils/request";
import { useHistory, useParams } from "react-router-dom";
import Lobby from "./Lobby";
import Question from "./Question";
import Inbetween from "./Inbetween";
import InbetweenCounter from "./InbetweenCounter";
import HallOfFame from "./HallOfFame";
import { pusher } from "../utils/pusher";

const Game = () => {
  const { code } = useParams();
  const history = useHistory();

  const player = Auth.getPlayer(code);

  const [activeScreen, setActiveScreen] = useState("pending");

  const [questions, setQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const activeQuestion = questions.length
    ? questions[activeQuestionIndex - 1]
    : {};
  const activeAnswers = answers[activeQuestion.id] || [];

  const [lobbyId, setLobbyId] = useState();
  const [quizId, setQuizId] = useState();

  const [answersCount, setAnswersCount] = useState(0);

  const castAnswers = async (answerIds) => {
    const { success, json } = await answerQuestion({
      lobbyId: lobbyId,
      playerId: player.id,
      answerIds,
    });

    setIsAnswerSubmitted(success);
  };

  useEffect(() => {
    const unsubscribe = onMount();

    if (!player) history.push(`/pregame/${code}`);

    return unsubscribe;
  }, []);

  const onMount = async () => {
    fetchData();
    const lobbyChannel = pusher.subscribe(code);
    lobbyChannel.bind("question_start", (data) => {
      setActiveScreen("counter");
      setActiveQuestionIndex(data.question_index);
    });
    lobbyChannel.bind("answer_sent", (data) => {
      setAnswersCount(data.answer_count);
    });
    lobbyChannel.bind("question_end", (data) => {
      setActiveScreen("leaderboard");
      setIsAnswerSubmitted(false);
    });
    lobbyChannel.bind("lobby_end", (data) => {
      setActiveScreen("finished");
    });

    return () => {
      console.log("unsubscribe");
      lobbyChannel.unsubscribe();
    };
  };

  const fetchData = async () => {
    const { json: lobby } = await fetchLobbyFromCode(code);
    setLobbyId(lobby.id);
    setQuizId(lobby.quiz_id);
    setActiveScreen(lobby.status);

    const { json: questions } = await fetchQuestions(lobby.quiz_id);
    setQuestions(questions);
    const allAnswers = await Promise.all(
      questions.map(({ id }) => fetchAnswers(id))
    );
    const answersByQuestion = allAnswers
      .filter(({ success }) => success)
      .map(({ json }) => json)
      .reduce(
        (acc, answers) => ({
          ...acc,
          [answers[0].question_id]: answers,
        }),
        {}
      );
    setAnswers(answersByQuestion);
    setActiveQuestionIndex(lobby.current_question_index);
  };

  const fetchAnswersCount = async () => {
    if (questions.length && activeQuestionIndex) {
      const { json: players } = await fetchPlayersThatAnsweredQuestion({
        lobbyId: lobbyId,
        questionId: activeQuestion.id,
      });
      setAnswersCount(players?.length || 0);
    }
  };

  useEffect(() => {
    fetchAnswersCount();
  }, [activeQuestionIndex, questions, answersCount]);

  switch (activeScreen) {
    case "pending":
      return <Lobby onStart={() => setActiveScreen("counter")} />;
    case "pregame":
      return <Lobby onStart={() => setActiveScreen("counter")} />;
    case "counter":
      return (
        <InbetweenCounter onComplete={() => setActiveScreen("in_progress")} />
      );
    case "in_progress":
      return (
        <Question
          isAnswerSubmitted={isAnswerSubmitted}
          question={activeQuestion}
          answers={activeAnswers}
          onCastAnswers={(ids) => castAnswers(ids)}
          questionIndex={activeQuestionIndex}
          totalQuestions={questions.length}
          answersCount={answersCount}
        />
      );
    case "leaderboard":
      return (
        <Inbetween
          lobbyId={lobbyId}
          questionIndex={activeQuestionIndex}
          totalQuestions={questions.length}
        />
      );
    case "finished":
      return <HallOfFame lobbyId={lobbyId} quizId={quizId} />;
    default:
      return <></>;
  }
};

export default Game;
