import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import React from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FormattedMessage } from "react-intl";
import { TextField, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import history from "../../utils/history";

export default function Register() {
  let { token } = useParams();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.password) {
          errors.password = "required";
        }

        return errors;
      }}
      onSubmit={async (values, formik) => {
        await axios.put(`/api/auth/register/${token}`, values);
        formik.setSubmitting(false);
        formik.resetForm();
        history.push("/auth");
      }}
      isInitialValid={false}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field
              name="firstName"
              fullWidth
              as={TextField}
              label={<FormattedMessage id="firstName" />}
              modifier="primary"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="lastName"
              fullWidth
              as={TextField}
              label={<FormattedMessage id="lastName" />}
              modifier="primary"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="password"
              fullWidth
              as={TextField}
              label={<FormattedMessage id="password" />}
              modifier="primary"
              variant="outlined"
              type="password"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Field>
              {({ form }) =>
                form.isSubmitting ? (
                  <LoadingSpinner />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!form.isValid}
                  >
                    <FormattedMessage id="register" />
                  </Button>
                )
              }
            </Field>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
