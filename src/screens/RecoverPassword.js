import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import PageNarrow from "../layouts/PageNarrow";
import styles from "./SignUp.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { recoverPassword } from "../utils/request";

const RecoverPassword = () => {
  const history = useHistory();

  return (
    <>
      <PageNarrow>
        <header className={styles.header}>
          <h4>Recover password</h4>
        </header>

        <Formik
          initialValues={{
            recoveryToken: "",
          }}
          onSubmit={async ({ recoveryToken }) => {
            const { success } = await recoverPassword({
              recoveryToken,
            });
            if (success) history.push("/");
          }}
        >
          <Form style={{ width: "100%" }}>
            <Field name="recoveryToken">
              {({ field }) => (
                <Input
                  label={"Recovery Token"}
                  placeholder={"token"}
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
                Generate password
              </Button>
            </div>
          </Form>
        </Formik>
      </PageNarrow>
    </>
  );
};

export default RecoverPassword;
