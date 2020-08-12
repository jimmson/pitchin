import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  AppBar,
  Toolbar,
  Grid,
  Link,
  Hidden,
  IconButton,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { ReactComponent as Logo } from "../../assets/logo-icon.svg";
import { isLoggedIn, isLoggedInAdmin } from "../../utils/auth";
import { NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

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
  const preventDefault = (event) => event.preventDefault();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  let buttons = [
    {
      label: "Contact Us",
      link: "/#need-help",
    },
    {
      label: "Donate",
      link: "/#donate",
    },
    {
      label: "Get Started",
      link: "/#get-started",
    },
  ];
  if (isLoggedInAdmin()) {
    buttons.push({
      label: "Dashboard",
      route: "/dashboard",
    });
  }
  if (isLoggedIn()) {
    buttons.push({
      label: "New Request",
      route: "/request",
    });
  } else {
    buttons.push({
      label: "Login",
      route: "/auth/login",
    });
  }

  const menu = (
    <Hidden mdDown>
      <Grid container spacing={2} alignItems="center">
        {buttons.map((button, index) => (
          <Grid item key={index}>
            {button.route ? (
              <NavLink exact to={button.route}>
                <Button>{button.label}</Button>
              </NavLink>
            ) : (
              <Link underline="none" href={button.link}>
                <Button>{button.label}</Button>
              </Link>
            )}
          </Grid>
        ))}
      </Grid>
    </Hidden>
  );

  const drawer = (
    <SwipeableDrawer
      anchor="right"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
      open={open}
    >
      <List>
        {buttons.map((button, index) => (
          <ListItem button key={index}>
            {button.route ? (
              <NavLink exact to={button.route}>
                <ListItemText primary={button.label} />
              </NavLink>
            ) : (
              <Link underline="none" href={button.link}>
                <ListItemText primary={button.label} />
              </Link>
            )}
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Logo className={classes.icon} />
            </Grid>
            <Grid item>{menu}</Grid>
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="primary"
                  onClick={toggleDrawer}
                  component="span"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
      {drawer}
    </div>
  );
};
