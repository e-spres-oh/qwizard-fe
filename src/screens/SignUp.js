import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import PageNarrow from "../layouts/PageNarrow";
import styles from "./SignUp.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useHistory } from "react-router-dom";
import { HATS, signUp } from "../utils/request";
import { Formik, Form, Field } from "formik";
import HatSlider from "../components/HatSlider";
import { useToasts } from "react-toast-notifications";

const SignUp = () => {
  const { addToast } = useToasts();
  const history = useHistory();

  const [hat, setHat] = useState(0);

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (errors.email) {
      addToast(errors.email, { appearance: "error" });
    }

    return errors;
  };

  return (
    <>
      <PageNarrow>
        <header className={styles.header}>
          <h4>Sign up</h4>
        </header>
        <HatSlider selectedHat={hat} onHatSelected={setHat} />

        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
          }}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async ({ username, email, password }) => {
            const { success, message } = await signUp({
              username,
              email,
              password,
              hat: Object.keys(HATS).find((h) => HATS[h] === hat + 1),
            });
            if (success) {
              history.push("/library/current");
            } else {
              addToast(message.toString(), { appearance: "error" });
            }
          }}
        >
          <Form style={{ width: "100%" }}>
            <Field name="email">
              {({ field }) => (
                <Input
                  label={"Email"}
                  placeholder={"email@email.com"}
                  field={field}
                />
              )}
            </Field>
            <Field name="username">
              {({ field }) => (
                <Input label={"Username"} placeholder={"John"} field={field} />
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <Input
                  type={"password"}
                  label={"Password"}
                  placeholder={"Password"}
                  field={field}
                />
              )}
            </Field>

            <div className={styles.buttonContainer}>
              <Link to={"/"}>
                <Button outline textColor={"black"}>
                  Cancel
                </Button>
              </Link>

              <Button type="submit" color="purple">
                Sign up
              </Button>
            </div>
          </Form>
        </Formik>
      </PageNarrow>
    </>
  );
};

export default SignUp;
