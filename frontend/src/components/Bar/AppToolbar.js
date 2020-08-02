import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, AppBar, Toolbar, Grid } from "@material-ui/core";
import { ReactComponent as Logo } from "../../assets/logo-icon.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px 30px",
    flexGrow: 1,
  },
  icon: {
    width: "65px",
    height: "65px",
  },
}));

export const AppToolbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Logo className={classes.icon} />
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                {[`About`, `Contact Us`, `Donate`, `Get Started`].map(
                  (text) => (
                    <Grid item>
                      <Button>{text}</Button>
                    </Grid>
                  )
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
