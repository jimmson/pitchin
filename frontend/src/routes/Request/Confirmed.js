import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormikContext } from "formik";
import { Grid, Button, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";

function Confirmed() {
  const { isValid } = useFormikContext();

  useEffect(() => {
    if (!isValid) {
      history.replace("/request/details");
    }
  }, [isValid]);

  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" color="primary">
          <FormattedMessage id="confirmation.content.header" />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          <FormattedMessage id="confirmation.content.body" />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Link to="/">
          <Button color="primary" variant="contained">
            <FormattedMessage id="confirmation.buttons.home" />
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default Confirmed;
