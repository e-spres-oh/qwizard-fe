import React, { useCallback, useEffect, useState } from "react";
import BookPage from "../layouts/BookPage";
import classNames from "classnames";
import styles from "./CreateQuiz.module.css";
import Button from "../components/Button";
import Select from "../components/Select";
import Input from "../components/Input";
import DragAndDrop from "../components/DragAndDrop";
import AnswerPreview from "../components/AnswerPreview";
import Slider from "../components/Slider";
import Sidebar from "../components/Sidebar";
import SideMenu from "../components/SideMenu";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  createAnswer,
  createQuestion,
  fetchAnswers,
  fetchQuestions,
  deleteQuestion,
  fetchQuiz,
  uploadQuestionImage,
  host,
  fetchSuggestedQuestion,
} from "../utils/request";
import { Formik, Form } from "formik";
import { useToasts } from "react-toast-notifications";

const CreateQuiz = () => {
  const { addToast } = useToasts();

  const [quizData, setQuizData] = useState({
    questions: [],
    answers: {
      1: { id: 1 },
      2: { id: 2 },
      3: { id: 3 },
      4: { id: 4 },
    },
    questionNumber: 1,
  });

  const { quizId, questionId } = useParams();
  const history = useHistory();

  const getAnswers = useCallback(async () => {
    const { json: answers } = await fetchAnswers(questionId);
    if (answers.length) {
      const answersMap = answers.reduce(
        (acc, a) => ({ ...acc, [a.id]: a }),
        {}
      );
      const selected = answers
        .filter(({ is_correct }) => is_correct)
        .map(({ id }) => id);

      setQuizData((oldValues) => ({
        ...oldValues,
        answers: answersMap,
        selected,
      }));
    }
  }, [questionId]);

  const suggestQuestion = async (setFieldValue) => {
    const { json: suggestedQuestion } = await fetchSuggestedQuestion();
    const answers = suggestedQuestion.answers;

    setFieldValue("questionTitle", suggestedQuestion.title);

    setFieldValue("answers", {
      1: { id: 1, title: answers[0].title },
      2: { id: 2, title: answers[1].title },
      3: { id: 3, title: answers[2].title },
      4: { id: 4, title: answers[3].title },
    });

    setFieldValue(
      "picked",
      answers
        .map((answer, index) => {
          if (answer.is_correct === true) {
            return index + 1;
          } else {
            return null;
          }
        })
        .filter((index) => index)
    );
  };

  const onCreateQuestion = async ({
    title,
    points,
    timeLimit,
    answers,
    picked,
    order,
    answerType,
  }) => {
    const { success, json: question } = await createQuestion({
      title,
      points,
      timeLimit,
      quizId,
      order,
      answerType,
    });

    if (!success) return;

    if (questionImage) {
      await uploadQuestionImage({
        file: questionImage,
        questionId: question.id,
      });
    }

    Object.keys(answers).forEach(async (k) => {
      const a = answers[k];

      createAnswer({
        title: a.title,
        isCorrect: picked.includes(a.id),
        questionId: question.id,
      });
    });

    setQuizData((oldValues) => ({
      ...oldValues,
      questionNumber: oldValues.questionNumber + 1,
    }));

    const { json: questions } = await fetchQuestions(quizId);
    _onFetchQuestions(questions);

    setQuestionImage(null);
    setQuestionImageUrl(null);

    history.replace(`/quiz/${quizId}/create/question/new`);
  };

  const _onFetchQuestions = (questions) => {
    setQuizData((oldValues) => ({
      ...oldValues,
      questions: [
        ...questions,
        {
          id: "new",
          title: "New Question",
          path: `/quiz/${quizId}/create/question/new`,
        },
      ],
    }));
  };

  const onDeleteQuestion = async (id) => {
    await deleteQuestion(id);
    const { json: questions } = await fetchQuestions(quizId);
    _onFetchQuestions(questions);
  };

  const onMount = useCallback(async () => {
    const { json: quiz } = await fetchQuiz(quizId);
    const { json: questions } = await fetchQuestions(quizId);

    if (questions?.length) {
      _onFetchQuestions(questions);
    }

    setQuizData((oldValues) => ({ ...oldValues, ...quiz }));

    if (questions?.some((q) => q.id == questionId)) {
      getAnswers();
    } else {
      setQuizData((oldValues) => ({
        ...oldValues,
        answers: {
          1: { id: 1 },
          2: { id: 2 },
          3: { id: 3 },
          4: { id: 4 },
        },
        selected: [],
      }));
    }
  }, [quizId, getAnswers]);

  useEffect(() => onMount(), [onMount]);

  const activeQuestion = quizData.questions.find((q) => q.id === +questionId);

  const [questionImage, setQuestionImage] = useState(null);
  const [questionImageUrl, setQuestionImageUrl] = useState(null);
  const onQuestionImageUpload = (file, preview) => {
    setQuestionImage(file);
    setQuestionImageUrl(preview);
  };

  const toggleAnswer = (values, answerId, setFieldValue) => {
    if (values.answerType === "single") {
      return setFieldValue("picked", [answerId]);
    }

    if (values.picked.includes(answerId)) {
      setFieldValue(
        "picked",
        values.picked.filter((id) => id !== answerId)
      );
    } else {
      setFieldValue("picked", [...values.picked, answerId]);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (values.picked.length === 0) {
      if (values.answerType === "single") {
        errors.pickedAnswer = "You should select a correct answer.";
      } else {
        errors.pickedAnswer = "You should select at least one correct answer.";
      }

      addToast(errors.pickedAnswer, { appearance: "error" });
    }

    return errors;
  };

  const isSelected = (values, answerId) => values.picked.includes(answerId);

  return (
    <BookPage>
      <Sidebar>
        <Link to={`/quiz/${quizId}/settings`}>
          <div className={styles.quizName}>
            <h4>{quizData.title}</h4>
          </div>
        </Link>

        <SideMenu
          onIconClick={onDeleteQuestion}
          items={quizData.questions.map((q) => ({
            id: q.id,
            text: q.title,
            path: `/quiz/${quizId}/create/question/${q.id}`,
            icon:
              history.location.pathname ===
              `/quiz/${quizId}/create/question/${q.id}`
                ? "trashLight"
                : "trashDark",
          }))}
        />
        <div className={styles.sidebarButtonContainer}>
          <div className={styles.sidebarButton}>
            <Link to="/library/current">
              <Button fluid outline textColor={"black"}>
                EXIT
              </Button>
            </Link>
          </div>
          <div className={styles.sidebarButton}>
            <Link to="/library/current">
              <Button fluid color={"turqouise"}>
                DONE
              </Button>
            </Link>
          </div>
        </div>
      </Sidebar>

      <div className={styles.createQuiz}>
        <Formik
          enableReinitialize
          initialValues={{
            timeLimit: activeQuestion?.time_limit || 20,
            points: activeQuestion?.points || 100,
            answerType: "single",
            questionTitle: activeQuestion?.title || "",
            picked: quizData.selected || [],
            answers: quizData.answers,
          }}
          onSubmit={async (values, actions) => {
            const {
              questionTitle: title,
              points,
              timeLimit,
              picked,
              answers,
              answerType,
            } = values;

            const order = quizData.questions.length || 1;

            onCreateQuestion({
              title,
              points,
              timeLimit,
              answers,
              picked,
              answerType,
              order,
            });

            actions.resetForm();
          }}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <>
              <Form>
                <div className={"column-grid"}>
                  <div className={"box-third"}>
                    <Select
                      value={values.timeLimit}
                      onChange={(e) => {
                        setFieldValue("timeLimit", e.target.value);
                      }}
                      data={{
                        label: "Time Limit",
                        options: [
                          { text: "20 sec", value: 20 },
                          { text: "30 sec", value: 30 },
                        ],
                      }}
                    ></Select>

                    <Slider
                      min={100}
                      max={400}
                      onChange={(value) => {
                        setFieldValue("points", value);
                      }}
                      label={"Points"}
                      value={values.points}
                    />
                    <Select
                      onChange={(e) => {
                        setFieldValue("answerType", e.target.value);
                        setFieldValue("picked", []);
                      }}
                      data={{
                        label: "Answer options",
                        options: [
                          { text: "Single select", value: "single" },
                          { text: "Multi select", value: "multiple" },
                        ],
                      }}
                      value={values.answerType}
                    ></Select>
                  </div>

                  <div className={classNames("box-two-thirds", styles.dnd)}>
                    <DragAndDrop
                      label={"Question image"}
                      onFileUpload={onQuestionImageUpload}
                      imageUrl={
                        activeQuestion?.image_url
                          ? `${host()}${activeQuestion?.image_url}`
                          : questionImageUrl
                      }
                    />
                  </div>
                </div>

                <Input
                  onChange={(e) =>
                    setFieldValue("questionTitle", e.target.value)
                  }
                  label={"Question"}
                  value={values.questionTitle}
                />

                <div className={styles.grid}>
                  <div className={"column-grid"}>
                    {Object.keys(values.answers).map((k) => {
                      const a = values.answers[k];
                      return (
                        <div
                          key={a.id}
                          className={classNames("box-half", styles.gridItem)}
                        >
                          <AnswerPreview
                            id={a.id}
                            onClick={() =>
                              toggleAnswer(values, a.id, setFieldValue)
                            }
                            onChange={(e) =>
                              setFieldValue("answers", {
                                ...values.answers,
                                [a.id]: {
                                  ...values.answers[a.id],
                                  title: e.target.value,
                                },
                              })
                            }
                            active={isSelected(values, a.id)}
                            text={a.title}
                            placeholder="Type an answer..."
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Form>
              <div className={styles.buttonContainer}>
                <div className={styles.button}>
                  <Button
                    type="button"
                    onClick={() => suggestQuestion(setFieldValue)}
                    color={"light-brown"}
                  >
                    Suggest question
                  </Button>
                </div>
                <div className={styles.button}>
                  <Button type="submit" onClick={handleSubmit} color={"purple"}>
                    ADD
                  </Button>
                </div>
              </div>
            </>
          )}
        </Formik>
      </div>
    </BookPage>
  );
};

export default CreateQuiz;
