import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Grid, Icon } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "../../utils/axios";
import { IconMap } from "../weather/iconmap";
import Ticket from "../Ticket";
import TicketDialog from "../TicketDialog";

export default (props) => {
  const [days, setDays] = useState();
  const [activeTicket, setActiveTicket] = React.useState(null);
  const [activeWeather, setActiveWeather] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDays = async () => {
    const { data = {} } = await axios.get("api/public/tickets");
    let days = data || [];
    setDays(days);
  };

  useEffect(() => {
    getDays();
  }, []);

  return (
    <>
      {days ? (
        <Grid container spacing={4}>
          {days.map((day, key) => (
            <React.Fragment key={key}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center" color="primary">
                  {day.date || "Any Day"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {day.weather && (
                  <React.Fragment>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <Icon
                          color="primary"
                          className={`wi wi-${IconMap.get(day.weather.icon)}`}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" align="center" color="primary">
                          {day.weather.description}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" align="center" color="primary">
                          {day.weather.min}° - {day.weather.max}°
                        </Typography>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                )}
              </Grid>
              {day.tickets.map((ticket, key) => (
                <Grid item xs={12} md={4}>
                  <Ticket
                    key={key}
                    ticket={ticket}
                    weather={day.weather}
                    handleClick={() => {
                      handleOpen();
                      setActiveTicket(ticket);
                      setActiveWeather(day.weather);
                    }}
                  ></Ticket>
                </Grid>
              ))}
              <TicketDialog
                open={open}
                ticket={activeTicket}
                weather={activeWeather}
                handleClose={handleClose}
              ></TicketDialog>
            </React.Fragment>
          ))}
        </Grid>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
