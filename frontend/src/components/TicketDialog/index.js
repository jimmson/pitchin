import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import Ticket from "../Ticket";
import Typography from "@material-ui/core/Typography";
import { IconMap } from "../weather/iconmap";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ({ open, ticket, weather, handleClose }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            {weather && (
              <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item>
                  <Icon
                    color="inherit"
                    className={`wi wi-${IconMap.get(weather.icon)}`}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6" align="center" color="inherit">
                    {weather.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" align="center" color="inherit">
                    {weather.min}° - {weather.max}°
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
        <Ticket ticket={ticket} fullscreen></Ticket>
      </Dialog>
    </div>
  );
}
