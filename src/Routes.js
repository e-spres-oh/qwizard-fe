import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import UserSettings from "./screens/UserSettings";
import SelectHat from "./screens/SelectHat";
import QuizLibrary from "./screens/QuizLibrary";
import CreateQuiz from "./screens/CreateQuiz";
import QuizSettings from "./screens/QuizSettings";
import Game from "./screens/Game";
import { HallOfFameScreen } from "./screens/HallOfFame";
import RequireAuth from "./components/auth/RequireAuth";
import RequireUnauth from "./components/auth/RequireUnauth";
import ForgotPassword from "./screens/ForgotPassword";
import RecoverPassword from "./screens/RecoverPassword";

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => (
          <RequireUnauth>{() => <Home {...props} />}</RequireUnauth>
        )}
      />
      <Route
        exact
        path="/signup"
        render={(props) => (
          <RequireUnauth>{() => <SignUp {...props} />}</RequireUnauth>
        )}
      />
      <Route
        exact
        path="/forgot-password"
        render={(props) => (
          <RequireUnauth>{() => <ForgotPassword {...props} />}</RequireUnauth>
        )}
      />
      <Route
        exact
        path="/recover-password"
        render={(props) => (
          <RequireUnauth>{() => <RecoverPassword {...props} />}</RequireUnauth>
        )}
      />
      <Route
        exact
        path="/user"
        render={(props) => (
          <RequireAuth>{() => <UserSettings {...props} />}</RequireAuth>
        )}
      />
      <Route
        exact
        path="/pregame/:code"
        render={(props) => (
          <RequireUnauth>{() => <SelectHat {...props} />}</RequireUnauth>
        )}
      />
      <Route
        exact
        path="/library/:type"
        render={(props) => (
          <RequireAuth>{() => <QuizLibrary {...props} />}</RequireAuth>
        )}
      />
      <Route
        exact
        path="/quiz/:quizId/create/question/:questionId?"
        render={(props) => (
          <RequireAuth>{() => <CreateQuiz {...props} />}</RequireAuth>
        )}
      />
      <Route
        exact
        path="/quiz/:quizId/settings"
        render={(props) => (
          <RequireAuth>{() => <QuizSettings {...props} />}</RequireAuth>
        )}
      />
      <Route exact path="/game/:code" component={Game} />
      <Route
        exact
        path="/lobbies/:lobbyId/quizzes/:quizId/hall-of-fame"
        component={HallOfFameScreen}
      />
    </Switch>
  );
};

export default Routes;
