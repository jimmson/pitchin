import React from "react";
import moment from "moment";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import RoomIcon from "@material-ui/icons/Room";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Avatar } from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import TodayIcon from "@material-ui/icons/Today";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

function Ticket({ ticket, active, category, area, selectTicket }) {
  const date = new moment(ticket.createdAt).format("DD.MM.YYYY hh:mm");
  const displayedDate = date !== "invalid date" ? date : "";
  const avatarName = (ticket.name || "N N").split(" ").map((item) => item[0]);
  const startDate = ticket.startDate ? moment(ticket.startDate) : null;
  const endDate = ticket.endDate ? moment(ticket.endDate) : null;

  return (
    <Card onClick={() => selectTicket()} elevation={active ? 8 : 1}>
      <CardHeader
        avatar={<Avatar>{avatarName}</Avatar>}
        title={ticket.name}
        subheader={displayedDate}
        action={ticket.status}
      />
      <CardContent>
        <List disablePaddin>
          {startDate && (
            <>
              <ListItem disableGutters dense>
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
                <ListItemText
                  primary={startDate.format("dddd, [The] Do [of] MMMM YYYY")}
                />
              </ListItem>
              <ListItem disableGutters dense>
                <ListItemIcon>
                  <AccessAlarmIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${startDate.format("h:mm A")} - ${endDate.format(
                    "h:mm A"
                  )}`}
                />
              </ListItem>
            </>
          )}
          {area && (
            <ListItem disableGutters dense>
              <ListItemIcon>
                <RoomIcon />
              </ListItemIcon>
              <ListItemText primary={area.name} />
            </ListItem>
          )}
        </List>
        <Typography variant="body1" component="div">
          {ticket.request}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Ticket;
