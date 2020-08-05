import isEmail from "isemail";
import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { login, LoggedInContext } from "../../utils/auth";
import { TextField, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function Login() {
  const { set } = useContext(LoggedInContext);
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = "Required";
          } else if (!isEmail.validate(values.email)) {
            errors.email = "Bad";
          }

          if (!values.password) {
            errors.password = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, formik) => {
          try {
            await login(values.email, values.password);
            set(true);
          } finally {
            formik.setSubmitting(false);
          }
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="email"
                  variant="outlined"
                  value={props.values.email}
                  onChange={props.handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  label="password"
                  variant="outlined"
                  type="password"
                  value={props.values.password}
                  onChange={props.handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
