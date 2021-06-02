import Auth from "./auth";

export const host = () => (window.qwizard_api || "https://qwizard-lab.herokuapp.com");
const version = "/api/v1";

export const HATS = {
  star: 1,
  earth: 2,
  spiral: 3,
  gnome: 4,
  nature: 5,
  fire: 6,
  swamp: 7,
  water: 8,
};

const config = {
  get headers() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  },
};

export const login = async (username, password) => {
  try {
    const res = await performFetch(`${host()}${version}/login`, {
      method: "POST",
      credentials: "include",
      headers: config.headers,
      body: JSON.stringify({
        user: {
          username: username || "fc640125-2a24-4d45-b93f-638dd31eef82",
          password: password || "927494de-d63a-4e2c-a44d-397face65985",
        },
      }),
    });

    const json = await res.json();
    Auth.logIn(json);
    return { success: true, json };
  } catch (e) {
    console.log(e);
    Auth.logOut();
    return { success: false, message: e.message };
  }
};

export const signUp = async ({ username, email, password, hat }) => {
  try {
    const res = await performFetch(`${host()}${version}/users`, {
      credentials: "include",
      method: "POST",
      headers: { ...config.headers },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          hat,
        },
      }),
    });

    await res.json();

    return await login(username, password);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const generateRecoveryToken = async ({ email }) => {
  try {
    await performFetch(`${host()}${version}/users/recovery_token`, {
      credentials: "include",
      method: "POST",
      headers: { ...config.headers },
      body: JSON.stringify({
        email,
      }),
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
};

export const recoverPassword = async ({ recoveryToken }) => {
  try {
    await performFetch(`${host()}${version}/users/recover_password`, {
      credentials: "include",
      method: "POST",
      headers: { ...config.headers },
      body: JSON.stringify({
        recovery_token: recoveryToken,
      }),
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, message: e };
  }
};

export const updateUser = async ({
  userId,
  username,
  email,
  password,
  hat,
}) => {
  try {
    const res = await performFetch(`${host()}${version}/users/${userId}`, {
      credentials: "include",
      method: "PUT",
      headers: { ...config.headers },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          hat,
        },
      }),
    });

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchCurrentQuizzes = async () => {
  try {
    const res = await performFetch(`${host()}${version}/quizzes`, {
      credentials: "include",
      method: "GET",
      headers: { ...config.headers },
    });

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchPastQuizzes = async () => {
  try {
    const res = await performFetch(`${host()}${version}/lobbies/finished`, {
      credentials: "include",
      method: "GET",
      headers: { ...config.headers },
    });

    const json = await res.json();

    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchQuiz = async (quizId) => {
  try {
    const res = await performFetch(`${host()}${version}/quizzes/${quizId}`, {
      credentials: "include",
      method: "GET",
      headers: { ...config.headers },
    });

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchQuestions = async (quizId) => {
  try {
    const res = await performFetch(
      `${host()}${version}/quizzes/${quizId}/questions`,
      {
        credentials: "include",
        method: "GET",
        headers: { ...config.headers },
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchQuestion = async (questionId) => {
  try {
    const res = await performFetch(
      `${host()}${version}/questions/${questionId}`,
      {
        credentials: "include",
        method: "GET",
        headers: { ...config.headers },
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchAnswers = async (questionId) => {
  try {
    const res = await performFetch(
      `${host()}${version}/questions/${questionId}/answers`,
      {
        credentials: "include",
        method: "GET",
        headers: { ...config.headers },
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchSuggestedQuestion = async () => {
  try {
    const res = await performFetch(
      `${host()}${version}/quizzes/suggest_question`,
      {
        credentials: "include",
        method: "GET",
        headers: { ...config.headers },
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const createQuestion = async ({
  title,
  points,
  timeLimit,
  quizId,
  answerType,
  order,
}) => {
  try {
    const res = await performFetch(
      `${host()}${version}/quizzes/${quizId}/questions`,
      {
        credentials: "include",
        method: "POST",
        headers: { ...config.headers },
        body: JSON.stringify({
          question: {
            title,
            points,
            time_limit: timeLimit,
            quiz_id: quizId,
            answer_type: answerType,
            order,
          },
        }),
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const updateQuestion = async ({
  title,
  points,
  timeLimit,
  questionId,
}) => {
  try {
    const res = await performFetch(
      `${host()}${version}/questions/${questionId}`,
      {
        credentials: "include",
        method: "PUT",
        headers: { ...config.headers },
        body: JSON.stringify({
          question: {
            title,
            points,
            time_limit: timeLimit,
          },
        }),
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const uploadQuestionImage = async ({ questionId, file }) => {
  const formData = new FormData();
  formData.append("image", file);

  const headers = { ...config.headers };
  delete headers["Content-Type"];

  try {
    const res = await performFetch(
      `${host()}${version}/questions/${questionId}/upload_image`,
      {
        credentials: "include",
        method: "POST",
        headers,
        body: formData,
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const res = await performFetch(
      `${host()}${version}/questions/${questionId}`,
      {
        credentials: "include",
        method: "DELETE",
        headers: { ...config.headers },
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const createAnswer = async ({ title, isCorrect, questionId }) => {
  try {
    const res = await performFetch(
      `${host()}${version}/questions/${questionId}/answers`,
      {
        credentials: "include",
        method: "POST",
        headers: { ...config.headers },
        body: JSON.stringify({
          answer: {
            title,
            is_correct: isCorrect,
            question_id: questionId,
          },
        }),
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const updateAnswer = async ({ title, isCorrect, answerId }) => {
  try {
    const res = await performFetch(`${host()}${version}/answers/${answerId}`, {
      credentials: "include",
      method: "PUT",
      headers: { ...config.headers },
      body: JSON.stringify({
        answer: {
          title,
          is_correct: isCorrect,
        },
      }),
    });
    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const createQuiz = async ({ title }) => {
  try {
    const res = await performFetch(`${host()}${version}/quizzes`, {
      credentials: "include",
      method: "POST",
      headers: { ...config.headers },
      body: JSON.stringify({
        quiz: {
          title,
        },
      }),
    });

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const updateQuiz = async ({ title, image, quizId }) => {
  try {
    const res = await performFetch(`${host()}${version}/quizzes/${quizId}`, {
      credentials: "include",
      method: "PUT",
      headers: { ...config.headers },
      body: JSON.stringify({
        quiz: {
          title,
          image,
        },
      }),
    });

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const uploadQuizImage = async ({ quizId, file }) => {
  const formData = new FormData();
  formData.append("image", file);

  const headers = { ...config.headers };
  delete headers["Content-Type"];

  try {
    const res = await performFetch(
      `${host()}${version}/quizzes/${quizId}/upload_image`,
      {
        credentials: "include",
        method: "POST",
        headers,
        body: formData,
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    const res = await performFetch(`${host()}${version}/quizzes/${quizId}`, {
      credentials: "include",
      method: "DELETE",
      headers: { ...config.headers },
    });

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const createLobby = async ({ status, quizId }) => {
  try {
    const res = await performFetch(
      `${host()}${version}/quizzes/${quizId}/lobbies`,
      {
        credentials: "include",
        method: "POST",
        headers: { ...config.headers },
        body: JSON.stringify({
          lobby: {
            status,
            quiz_id: quizId,
          },
        }),
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const createPlayer = async ({ lobbyId, name, hat }) => {
  try {
    const res = await performFetch(
      `${host()}${version}/lobbies/${lobbyId}/join`,
      {
        credentials: "include",
        method: "POST",
        headers: { ...config.headers },
        body: JSON.stringify({
          player: {
            name,
            hat,
          },
        }),
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchPlayers = async (lobbyId) => {
  try {
    const res = await performFetch(
      `${host()}${version}/lobbies/${lobbyId}/players`,
      {
        credentials: "include",
        method: "GET",
        headers: { ...config.headers },
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchPlayer = async (playerId) => {
  try {
    const res = await performFetch(`${host()}${version}/players/${playerId}`, {
      credentials: "include",
      method: "GET",
      headers: { ...config.headers },
    });

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchLobby = async (quizId) => {
  try {
    const res = await performFetch(
      `${host()}${version}/quizzes/${quizId}/lobbies`,
      {
        credentials: "include",
        method: "GET",
        headers: { ...config.headers },
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchLobbyFromCode = async (code) => {
  try {
    const res = await performFetch(
      `${host()}${version}/lobbies/from_code/${code}`,
      {
        credentials: "include",
        method: "GET",
        headers: { ...config.headers },
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchMe = async () => {
  try {
    const res = await performFetch(`${host()}${version}/me`, {
      credentials: "include",
      method: "GET",
      headers: { ...config.headers },
    });

    const json = await res.json();
    Auth.logIn(json);
    return { success: true, json };
  } catch (e) {
    if (e instanceof NotFoundError) {
      Auth.logIn({ username: "foo" });
      return { success: true, json: { username: "foo" } };
    }
    console.log(e);
    Auth.logOut();
    return { success: false, message: e.message };
  }
};

export const startLobby = async (lobbyId) => {
  try {
    const res = await performFetch(
      `${host()}${version}/lobbies/${lobbyId}/start`,
      {
        credentials: "include",
        method: "POST",
        headers: { ...config.headers },
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const answerQuestion = async ({ lobbyId, playerId, answerIds }) => {
  try {
    const res = await performFetch(
      `${host()}${version}/lobbies/${lobbyId}/answer`,
      {
        credentials: "include",
        method: "POST",
        headers: { ...config.headers },
        body: JSON.stringify({
          player_id: playerId,
          answers: answerIds,
        }),
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchPlayersThatAnsweredQuestion = async ({
  lobbyId,
  questionId,
}) => {
  try {
    const res = await performFetch(
      `${host()}${version}/lobbies/${lobbyId}/players_done?question_id=${questionId}`,
      {
        credentials: "include",
        method: "GET",
        headers: { ...config.headers },
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchLobbyScore = async (lobbyId) => {
  try {
    const res = await performFetch(
      `${host()}${version}/lobbies/${lobbyId}/score`,
      {
        credentials: "include",
        method: "GET",
        headers: { ...config.headers },
      }
    );

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const logout = async () => {
  try {
    Auth.logOut();

    const res = await performFetch(`${host()}${version}/logout`, {
      credentials: "include",
      method: "DELETE",
      headers: { ...config.headers },
    });

    const json = await res.json();
    return { success: true, json };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

const performFetch = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error(
        buildErrorsFromAnswer({
          errors: [
            {
              attribute: "",
              message:
                "You are not authorized to access this page. Please log in.",
            },
          ],
        })
      );
    }
    if (res.status === 404) {
      throw new NotFoundError();
    }

    const error = await res.json();

    throw new Error(buildErrorsFromAnswer(error));
  }
  return res;
};

export const buildErrorsFromAnswer = (error) => {
  let errors = (error.errors || [])
    .map((e) => {
      return `${e.attribute} ${e.message}`;
    })
    .join("; ");

  return errors;
};

class NotFoundError extends Error {}
