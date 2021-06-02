import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import PageNarrow from "../layouts/PageNarrow";
import styles from "./SignUp.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { generateRecoveryToken } from "../utils/request";
import { useToasts } from "react-toast-notifications";

const ForgotPassword = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email can't be blank";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email address invalid";
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
          <h4>Send recovery token</h4>
        </header>

        <Formik
          initialValues={{
            email: "",
          }}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async ({ email }) => {
            const { success } = await generateRecoveryToken({
              email,
            });
            if (success) history.push("/recover-password");
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

            <div className={styles.buttonContainer}>
              <Link to={"/"}>
                <Button outline textColor={"black"}>
                  Cancel
                </Button>
              </Link>

              <Button type="submit" color="purple">
                Send token
              </Button>
            </div>
          </Form>
        </Formik>
      </PageNarrow>
    </>
  );
};

export default ForgotPassword;
