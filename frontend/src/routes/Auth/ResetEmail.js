import axios from "axios";
import React, { useState } from "react";
import isEmail from "isemail";
import { Grid, TextField } from "@material-ui/core";

export default function ResetEmail() {
  const [email, setEmail] = useState("");

  function handleInputChange({ target }) {
    setEmail(target.value);
  }

  async function reset() {
    if (!email || !isEmail.validate(email)) {
      alert("bad email");
    }

    try {
      await axios.post(`/api/auth/reset?email=${email}`);
    } catch (error) {}
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id="email"
          name="email"
          label="email"
          type="email"
          variant="outlined"
          onChange={handleInputChange}
          required
          fullWidth
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
