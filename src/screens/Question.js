import React, { useEffect, useRef, useState } from "react";
import BookPage from "../layouts/BookPage";
import styles from "./Question.module.css";
import classNames from "classnames";
import Answer from "../components/Answer";
import Button from "../components/Button";
import { host } from "../utils/request";
import Toast from "../components/Toast";

const Question = ({
  question,
  answers,
  onCastAnswers,
  questionIndex,
  totalQuestions,
  answersCount,
  isAnswerSubmitted,
}) => {
  const [timer, setTimer] = useState(question.time_limit);
  const timerRef = useRef(timer);
  timerRef.current = timer;

  useEffect(() => {
    if (timer === null) return;
    let interval;

    interval = setInterval(() => {
      let currentTimer = timerRef.current;
      if (currentTimer === 0) return clearInterval(interval);
      setTimer((oldTimer) => oldTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const toggleAnswer = (answerId) => {
    if (question.answer_type === "single") {
      return setSelectedAnswers([answerId]);
    }

    if (selectedAnswers.includes(answerId)) {
      setSelectedAnswers(selectedAnswers.filter((id) => id !== answerId));
    } else {
      setSelectedAnswers([...selectedAnswers, answerId]);
    }
  };

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const isSelected = (answerId) => selectedAnswers.includes(answerId);
  const hasAnsweredCorrect = selectedAnswers.includes(
    answers.find((a) => a.is_correct === true)?.id
  );

  return (
    <BookPage sidebar={false} basic={true} logo={true}>
      {isAnswerSubmitted && (
        <Toast
          headline={`${
            hasAnsweredCorrect ? `Correct! +${question.points}` : "Wrong"
          } `}
          text={hasAnsweredCorrect ? "Magnificent!" : "Focus-Pocus!"}
          color={hasAnsweredCorrect ? "green" : "red"}
        ></Toast>
      )}

      <div className={styles.question}>
        <h1 className={styles.number}>
          {questionIndex} / {totalQuestions}
        </h1>
        <div className={styles.hero}>
          <div
            className={classNames({
              [styles.image]: true,
              [styles.imageBackground]: !question.image_url,
            })}
          >
            <img
              className={styles.img}
              alt={"cristal globe"}
              src={
                question.image_url
                  ? `${host()}${question.image_url}`
                  : require("../static/svg/placeholderImage.svg").default
              }
            />
          </div>
          <div className={styles.utils}>
            <div className={styles.time}>
              <img
                className={styles.hourglass}
                alt={"Hourglass"}
                src={require("../static/svg/hourglass.svg").default}
              />
              {timer || 0} sec
            </div>
            <div className={styles.count}>
              <img
                className={styles.wand}
                alt={"wand"}
                src={require("../static/svg/wand.svg").default}
              />
              {answersCount} <br />
              answers
            </div>
          </div>
        </div>
        <h3 className={classNames([styles.text])}>{question?.title}</h3>
        <div className={styles.grid}>
          <div className={classNames("column-grid", [styles.grid])}>
            {answers.map((a) => (
              <div
                key={a.id}
                className={classNames({
                  "box-half": true,
                  [styles.gridItem]: true,
                  [styles.disabled]:
                    question.answer_type === "single" &&
                    selectedAnswers.length > 0 &&
                    !isSelected(a.id),
                })}
              >
                <Answer
                  state={isAnswerSubmitted}
                  type={a.is_correct}
                  onClick={() => (isAnswerSubmitted ? "" : toggleAnswer(a.id))}
                  active={isSelected(a.id)}
                  text={a.title}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.button}>
          <Button
            color={"turqouise"}
            onClick={() => onCastAnswers(selectedAnswers)}
          >
            CAST ANSWER
          </Button>
        </div>
      </div>
    </BookPage>
  );
};

export default Question;
