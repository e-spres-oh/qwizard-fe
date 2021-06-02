import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import PageNarrow from "../layouts/PageNarrow";
import styles from "./UserSettings.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useHistory } from "react-router-dom";
import { fetchMe, HATS, updateUser } from "../utils/request";
import { Form, Formik } from "formik";
import HatSlider from "../components/HatSlider";
import { useToasts } from "react-toast-notifications";

const UserSettings = () => {
  const { addToast } = useToasts();
  const history = useHistory();

  const [user, setUser] = useState();
  const [hat, setHat] = useState(1);

  useEffect(() => {
    onMount();
  }, []);

  const onMount = async () => {
    const { json: me } = await fetchMe();
    setUser({ ...me });
    setHat(me?.hat);
  };

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

  if (!user) return "LOADING";
  return (
    <PageNarrow>
      <header className={styles.header}>
        <h4>Settings</h4>
      </header>
      <HatSlider selectedHat={hat} onHatSelected={setHat} />
      <Formik
        initialValues={{
          email: user.email,
          username: user.username,
          password: user.password,
        }}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async ({ username, email, password }) => {
          const { success, message } = await updateUser({
            userId: user.id,
            username,
            email,
            password,
            hat: Object.keys(HATS).find((h) => {
              return HATS[h] === hat + 1;
            }),
          });

          if (success) {
            addToast("Settings updated!", { appearance: "success" });
            history.push("/library/current");
          } else {
            addToast(message.toString(), { appearance: "error" });
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form style={{ width: "100%" }}>
            <Input
              onChange={(e) => setFieldValue("email", e.target.value)}
              label={"Email"}
              value={values.email}
            />
            <Input
              onChange={(e) => setFieldValue("username", e.target.value)}
              label={"Username"}
              value={values.username}
            />
            <Input
              onChange={(e) => setFieldValue("password", e.target.value)}
              label={"Password"}
              type="password"
              value={values.password}
            />
            <div className={styles.buttonContainer}>
              <Link to={"/library/current"}>
                <Button outline textColor={"black"}>
                  Cancel
                </Button>
              </Link>

              <Button type="submit" color="purple">
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </PageNarrow>
  );
};

export default UserSettings;
