import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { createMuiTheme } from "@material-ui/core/styles";
import { lightBlue, lightGreen } from "@material-ui/core/colors";
import { Grid, Paper } from "@material-ui/core";
import axios from "../../utils/axios";

export const TaskList = (props) => {
  const [tickets, setTickets] = useState();

  const getTickets = async () => {
    const { data = {} } = await axios.get("/api/tickets");
    setTickets(data.tickets || []);
    console.log(data.tickets);
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <>
      {tickets ? (
        <Grid container spacing={4}>
          {tickets.map((ticket, index) => (
            <Grid item key={index} xs={4} spacing={4}>
              <Grid container spacing={4}>
                <Grid item>{ticket.name}</Grid>
                <Grid item>{ticket.address}</Grid>
                <Grid item>{ticket.startDate}</Grid>
                <Grid item>{ticket.endDate}</Grid>
                <Grid item>{ticket.request}</Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
