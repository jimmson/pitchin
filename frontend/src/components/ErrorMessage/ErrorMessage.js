import React from "react";
import { ErrorMessage } from "formik";
import Alert from "@material-ui/lab/Alert";

export default function CustomErrorMessage(props) {
  return (
    <ErrorMessage {...props}>
      {(msg) => <Alert severity="error">{msg}</Alert>}
    </ErrorMessage>
  );
}
