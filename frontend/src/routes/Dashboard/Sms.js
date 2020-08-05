import React, { useEffect, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import axios from "../../utils/axios";
import { Formik, Form, Field } from "formik";
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@material-ui/core";

import CustomButton from "../../components/CustomButton/CustomButton";

export default () => {
  const [info, setInfo] = useState(null);

  const getInfo = useCallback(async () => {
    const { data } = await axios.get("/api/settings/sms");

    setInfo(data);
  }, []);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  if (info === null) {
    return null;
  }

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Typography gutterBottom variant="h5">
          <FormattedMessage id="messages" />
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Formik
          initialValues={{
            ...info,
            Infobip: {
              // API returns Infobip as empty object if fields aren't set initially
              baseUrl: info.Infobip.baseUrl || "",
              apiKey: info.Infobip.apiKey || "",
            },
          }}
          onSubmit={async (values, formik) => {
            const { provider, Infobip, ...rest } = values;
            let valuesToSend = rest;

            if (Infobip.apiKey.length !== 0 && Infobip.baseUrl.length !== 0) {
              valuesToSend.Infobip = Infobip;
            } else {
              valuesToSend.Infobip = {};
            }

            try {
              await axios.put("/api/settings/sms", valuesToSend);

              formik.setSubmitting(false);
            } catch (e) {
              alert(e.message);
            }
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="Infobip.baseUrl"
                  label={<FormattedMessage id="messages.infobip.baseUrl" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="Infobip.apiKey"
                  label={<FormattedMessage id="messages.infobip.apiKey" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="prefix"
                  label={<FormattedMessage id="messages.prefix" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field name="sendAcceptText">
                  {({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          name={field.name}
                          checked={field.value}
                          {...field}
                        />
                      }
                      label={<FormattedMessage id="messages.sendAcceptText" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="acceptText"
                  label={<FormattedMessage id="messages.acceptText" />}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <Field name="sendRejectText">
                  {({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          name={field.name}
                          checked={field.value}
                          label={
                            <FormattedMessage id="messages.sendRejectText" />
                          }
                          {...field}
                        />
                      }
                      label={<FormattedMessage id="messages.sendRejectText" />}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="rejectText"
                  label={<FormattedMessage id="messages.rejectText" />}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <Field>
                  {({ form }) => (
                    <CustomButton
                      titleId="save"
                      modifier="primary"
                      type="submit"
                      disabled={form.isSubmitting || !form.isValid}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};
