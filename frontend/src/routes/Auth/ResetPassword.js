import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { TextField, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function ResetPassword() {
  let { token } = useParams();

  const [payload, setPayload] = useState({});
  const [isValid] = useState(true);

  useEffect(() => {
    async function checkToken() {
      await axios.get(`/api/auth/reset/${token}`);
    }

    checkToken();
  }, [token]);

  function handleInputChange({ target }) {
    setPayload({
      ...payload,
      [target.name]: target.value,
    });
  }

  async function reset() {
    if (!isValid) alert("token not valid");
    await axios.put(`/api/auth/reset/${token}`, payload);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="password"
          name="password"
          label={<FormattedMessage id="password" />}
          variant="outlined"
          type="password"
          onChange={handleInputChange}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={reset}>
          <FormattedMessage id="sendPasswordToEmail" />
        </Button>
      </Grid>
    </Grid>
  );
}
