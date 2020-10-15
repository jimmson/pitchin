import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import RoomIcon from "@material-ui/icons/Room";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TodayIcon from "@material-ui/icons/Today";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 160,
  },
});

export default function ({ ticket, handleClick, fullscreen }) {
  const classes = useStyles();

  return (
    <Card style={{ height: "100%" }}>
      {ticket.imageURL && (
        <CardMedia className={classes.media} image={ticket.imageURL} />
      )}
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List disablePadding>
              {ticket.address && (
                <ListItem disableGutters dense>
                  <ListItemIcon>
                    <RoomIcon />
                  </ListItemIcon>
                  <ListItemText primary={ticket.address} />
                </ListItem>
              )}
              {ticket.time && (
                <ListItem disableGutters dense>
                  <ListItemIcon>
                    <TodayIcon />
                  </ListItemIcon>
                  <ListItemText primary={ticket.time} />
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="div">
              {ticket.organisation}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" component="div">
              {ticket.name}
            </Typography>
          </Grid>
          {fullscreen && (
            <Grid item xs={12}>
              <Typography variant="body1" component="div">
                {ticket.description}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
      {handleClick && (
        <CardActions>
          <Button onClick={handleClick}>Read More</Button>
        </CardActions>
      )}
    </Card>
  );
}
