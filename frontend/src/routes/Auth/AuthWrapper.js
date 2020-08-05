import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import { isLoggedInAdmin } from "../../utils/auth";
import history from "../../utils/history";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function Auth(props) {
  const [isLoginChecked, setIsLoginChecked] = useState(false);

  useEffect(() => {
    if (isLoggedInAdmin()) {
      history.replace("/");
    } else {
      setIsLoginChecked(true);
    }
  }, []);

  if (!isLoginChecked) return <LoadingSpinner />;

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid container item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
}
