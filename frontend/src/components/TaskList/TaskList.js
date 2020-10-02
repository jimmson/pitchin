import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Grid, Card, Icon, CardContent, Typography } from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";
import RoomIcon from "@material-ui/icons/Room";
import axios from "../../utils/axios";
import { IconMap } from "../weather/iconmap";
import styles from "weather-icons/css/weather-icons.min.css";

export const TaskList = (props) => {
  const [days, setDays] = useState();

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
                <Grid item key={key} xs={4}>
                  <Card>
                    {/* <CardHeader title={ticket.name} /> */}
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Grid
                            container
                            spacing={1}
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                          >
                            {ticket.time && (
                              <React.Fragment>
                                <Grid item>
                                  <TodayIcon />
                                </Grid>
                                <Grid item>{ticket.time}</Grid>
                              </React.Fragment>
                            )}
                            <Grid item>
                              <RoomIcon />
                            </Grid>
                            <Grid item>{ticket.address}</Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h5" component="div">
                            {ticket.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1" component="div">
                            {ticket.description}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
