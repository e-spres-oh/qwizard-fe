import React, { useEffect, useState } from "react";
import DragAndDrop from "../components/DragAndDrop";
import TextArea from "../components/TextArea";
import BookPage from "../layouts/BookPage";
import classNames from "classnames";
import styles from "./QuizSettings.module.css";
import Sidebar from "../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { fetchQuiz, updateQuiz, uploadQuizImage, host } from "../utils/request";

const QuizSettings = () => {
  const [quizData, setQuizData] = useState({ title: null, image: "YYY" });
  const { quizId } = useParams();

  useEffect(() => {
    onFetchQuiz();
  }, []);

  const onFetchQuiz = async () => {
    const { json: quiz } = await fetchQuiz(quizId);
    setQuizData((oldValues) => ({
      ...oldValues,
      title: quiz.title,
      image_url: quiz.image_url,
    }));
  };

  const onSaveClick = async () => {
    await updateQuiz({ title: quizData.title, quizId });
    if (quizImage) {
      await uploadQuizImage({
        file: quizImage,
        quizId,
      });
    }
    onFetchQuiz();
    setQuizImage(null);
    setQuizImageUrl(null);
  };

  const [quizImage, setQuizImage] = useState(null);
  const [quizImageUrl, setQuizImageUrl] = useState(null);
  const onQuizImageUpload = (file, preview) => {
    setQuizImage(file);
    setQuizImageUrl(preview);
  };

  return (
    <BookPage>
      <Sidebar>
        <Link to={`/quiz/${quizId}/settings`}>
          <div className={styles.quizName}>
            <h4>{quizData.title || "Quiz title..."}</h4>
          </div>
        </Link>

        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <Link to={`/quiz/${quizId}/create/question/new`}>
              <Button fluid outline textColor={"black"}>
                BACK
              </Button>
            </Link>
          </div>
          <div className={styles.button}>
            <Button
              type="button"
              onClick={onSaveClick}
              fluid
              color={"turqouise"}
            >
              SAVE
            </Button>
          </div>
        </div>
      </Sidebar>
      <div className={styles.quizSettings}>
        <div className={"column-grid"}>
          <div className={"box-third"}>
            <TextArea
              value={quizData.title}
              className={styles.textArea}
              label={"Quiz title"}
              placeholder={"Enter quiz title..."}
              onChange={(e) =>
                setQuizData((oldValues) => ({
                  ...oldValues,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className={classNames("box-two-thirds", styles.dnd)}>
            <DragAndDrop
              label={"Cover image"}
              onFileUpload={onQuizImageUpload}
              imageUrl={
                quizImageUrl ||
                (quizData.image_url && `${host()}${quizData.image_url}`)
              }
            />
          </div>
        </div>
      </div>
    </BookPage>
  );
};

export default QuizSettings;
