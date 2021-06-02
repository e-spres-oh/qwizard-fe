import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import PageNarrow from "../layouts/PageNarrow";
import styles from "./Home.module.css";
import { Formik, Form, Field } from "formik";
import { login } from "../utils/request";
import Divider from "../components/Divider";
import { useToasts } from "react-toast-notifications";

const Home = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  return (
    <PageNarrow>
      <header className={styles.header}>
        <h4>
          Welcome, fellow qwizard! <br />A magical world of quizzes awaits you.
        </h4>
      </header>

      <Formik
        initialValues={{
          code: "",
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          if (values.code) return history.push(`/pregame/${values.code}`);
          const { success, message } = await login(
            values.username,
            values.password
          );
          if (success) {
            history.push("/library/current");
          } else {
            addToast(message.toString(), { appearance: "error" });
          }
        }}
      >
        <Form style={{ width: "100%" }}>
          <Field name="code">
            {({ field }) => (
              <Input
                label={"Join with a spell code"}
                placeholder={"AD23IW@2"}
                field={field}
              />
            )}
          </Field>
          <div className={styles.inputDivider}>
            <Divider />
          </div>
          <Field name="username">
            {({ field }) => (
              <Input
                label={"Qwizard name"}
                placeholder={"John"}
                field={field}
              />
            )}
          </Field>
          <Field name="password">
            {({ field }) => (
              <Input
                type={"password"}
                label={"Qwizard Secret Password"}
                placeholder={"*********"}
                field={field}
              />
            )}
          </Field>

          <div className={styles.buttonContainer}>
            <Button type="submit" color="purple">
              ENTER
            </Button>

            <div className={styles.buttonDivider}>
              <Divider />
            </div>

            <div className={styles.signUpButton}>
              <Link to="/signup">
                <Button color="turqouise">Sign up</Button>
              </Link>
            </div>
            <Link to={"/forgot-password"}>
              <Button color="turqouise">Recover password</Button>
            </Link>
          </div>
        </Form>
      </Formik>
    </PageNarrow>
  );
};

export default Home;
