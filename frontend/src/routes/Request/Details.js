import React, { useContext, useEffect, Fragment } from "react";
import { Field, useFormikContext } from "formik";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { RequestOptionsContext } from "./RequestWrapper";
import {
  Checkbox,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TimePicker, DatePicker } from "formik-material-ui-pickers";

const useStyles = makeStyles((theme) => ({}));

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
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" color="primary">
          <FormattedMessage id="addContact.content.header" />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          <FormattedMessage id="addContact.content.body" />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Field
          name="phone"
          as={TextField}
          label={<FormattedMessage id="addContact.placeholders.phone" />}
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12}>
        <ErrorMessage name="phone" />
      </Grid>
      {selectedCategory && selectedCategory.needsAddress && (
        <>
          <Grid item xs={12}>
            <Field
              name="address"
              as={TextField}
              label={<FormattedMessage id="addContact.placeholders.address" />}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <ErrorMessage name="address" />
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Field
              name="area"
              as={TextField}
              label={<FormattedMessage id="addContact.placeholders.area" />}
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
          <Grid item xs={12}>
            <ErrorMessage name="area" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
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
                label={<FormattedMessage id="addContact.placeholders.date" />}
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
      <Grid item xs={12}>
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
      </Grid>
    </Grid>
  );
}

export default Details;
