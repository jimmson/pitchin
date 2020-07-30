import React, { useContext, useEffect, Fragment } from "react";
import { Field, useFormikContext } from "formik";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { RequestOptionsContext } from "./RequestWrapper";
import { Checkbox, TextField, Button, MenuItem, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TimePicker, DatePicker } from "formik-material-ui-pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Details() {
  const classes = useStyles();

  const { categories, areas } = useContext(RequestOptionsContext);
  const { values, isValid, isSubmitting, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!values.request) {
      history.replace("/request/request");
    }
  }, [values.request]);

  const selectedCategory = categories.find((c) => c._id === values.category);

  function back() {
    history.go(-1);
  }

  return (
    <Grid container spacing={0}>
      <Grid item md={12} xs={12}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100%" }}
        >
          <Box m={2}>
            <h1 className="text-alpha">
              <FormattedMessage id="addContact.content.header" />
            </h1>
            <h3 className="text-alpha">
              <FormattedMessage id="addContact.content.body" />
            </h3>

            <Grid container spacing={2} direction="column">
              <Grid item>
                <ErrorMessage name="name" />
                <Field
                  name="name"
                  as={TextField}
                  label={<FormattedMessage id="addContact.placeholders.name" />}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <ErrorMessage name="phone" />
                <Field
                  name="phone"
                  as={TextField}
                  label={
                    <FormattedMessage id="addContact.placeholders.phone" />
                  }
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              {selectedCategory && selectedCategory.needsAddress && (
                <Grid item>
                  <ErrorMessage name="address" />
                  <Field
                    name="address"
                    as={TextField}
                    label={
                      <FormattedMessage id="addContact.placeholders.address" />
                    }
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              )}
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ErrorMessage name="area" />
                    <Field
                      name="area"
                      as={TextField}
                      label={
                        <FormattedMessage id="addContact.placeholders.area" />
                      }
                      variant="outlined"
                      fullWidth
                      required
                      select
                    >
                      {areas.map((area) => (
                        <MenuItem value={area._id} key={area._id}>
                          {area.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={6}>
                    <ErrorMessage name="maxParticipants" />
                    <Field
                      name="maxParticipants"
                      as={TextField}
                      label={
                        <FormattedMessage id="addContact.placeholders.participants" />
                      }
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={2}>
                      <Grid item xs={1}>
                        <Field
                          component={Checkbox}
                          onChange={(event) => {
                            setFieldValue("hasDate", event.target.checked);
                          }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <Field
                          name="date"
                          component={DatePicker}
                          label={
                            <FormattedMessage id="addContact.placeholders.date" />
                          }
                          disablePast
                          disabled={!values.hasDate}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Field
                          name="startTime"
                          component={TimePicker}
                          label={
                            <FormattedMessage id="addContact.placeholders.startTime" />
                          }
                          disabled={!values.hasDate}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Field
                          name="endTime"
                          component={TimePicker}
                          label={
                            <FormattedMessage id="addContact.placeholders.endTime" />
                          }
                          disabled={!values.hasDate}
                        />
                      </Grid>
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>

            <div className={classes.root}>
              {isSubmitting ? (
                <LoadingSpinner />
              ) : (
                <Fragment>
                  <Button type="button" variant="contained" onClick={back}>
                    <FormattedMessage id="addContact.buttons.back" />
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    disabled={!isValid}
                  >
                    <FormattedMessage id="addContact.buttons.next" />
                  </Button>
                </Fragment>
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Details;
