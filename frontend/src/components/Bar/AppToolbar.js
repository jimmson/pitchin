import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, AppBar, Toolbar } from "@material-ui/core";
import { ReactComponent as Logo } from "../../assets/logo-icon.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px 30px",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    flexGrow: 1,
  },
}));

export const AppToolbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <div className={classes.logo}>
            <Logo />
          </div>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact Us</Button>
          <Button color="inherit">Donate</Button>
          <Button color="inherit">Get Started</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
