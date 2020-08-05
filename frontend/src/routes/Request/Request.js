import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useFormikContext, Field } from "formik";
import history from "../../utils/history";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Request() {
  const classes = useStyles();

  const { values } = useFormikContext();
  const intl = useIntl();

  useEffect(() => {
    if (!values.category) {
      history.replace("/request/category");
    }
  }, [values.category]);

  function next() {
    history.push("/request/details");
  }

  function back() {
    history.go(-1);
  }

  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" color="primary">
          <FormattedMessage id="writeRequest.content.header" />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Field
          name="request"
          as={TextField}
          label={<FormattedMessage id="writeRequest.content.body" />}
          placeholder={intl.formatMessage({
            id: "writeRequest.placeholders.request",
          })}
          variant="outlined"
          multiline
          rows="5"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="button" onClick={back} variant="contained">
          <FormattedMessage id="writeRequest.buttons.back" />
        </Button>
        <Button
          color="primary"
          onClick={next}
          type="button"
          disabled={!values.request}
          variant="contained"
        >
          <FormattedMessage id="writeRequest.buttons.next" />
        </Button>
      </Grid>
    </Grid>
  );
}

export default Request;
