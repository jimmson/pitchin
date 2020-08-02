import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, AppBar, Toolbar, Grid } from "@material-ui/core";
import { ReactComponent as Logo } from "../../assets/logo-icon.svg";
import { isLoggedIn, isLoggedInAdmin } from "../../utils/auth";
import { NavLink } from "react-router-dom";

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

  let buttons = [
    {
      label: "About",
      route: "/",
    },
    {
      label: "Contact Us",
      route: "/",
    },
    {
      label: "Donate",
      route: "/",
    },
    {
      label: "Get Started",
      route: "/",
    },
  ];
  if (isLoggedIn()) {
    buttons.push({
      label: "New Request",
      route: "/request",
    });
  }
  if (isLoggedInAdmin()) {
    buttons.push({
      label: "Dashboard",
      route: "/dashboard",
    });
  }

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
                {buttons.map((button, index) => (
                  <Grid item key={index}>
                    <NavLink exact to={button.route}>
                      <Button>{button.label}</Button>
                    </NavLink>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
