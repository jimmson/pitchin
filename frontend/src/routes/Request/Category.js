import React, { useContext } from "react";
import { useFormikContext } from "formik";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import { RequestOptionsContext } from "./RequestWrapper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
  },
}));

function Category() {
  const classes = useStyles();
  const { categories } = useContext(RequestOptionsContext);
  const { setFieldValue } = useFormikContext();

  function select(id) {
    setFieldValue("category", id);
    history.push("/request/request");
  }

  const SelectorButtons = () => {
    let map = {};
    categories.forEach((category) => {
      map[category.organisation] = map[category.organisation] || [];
      map[category.organisation].push({
        _id: category._id,
        name: category.name,
      });
    });

    let organisations = [];
    for (var propt in map) {
      organisations.push({
        name: propt,
        categories: map[propt],
      });
    }

    return (
      <>
        {organisations.map((organisation, index) => (
          <List
            className={classes.list}
            key={index}
            subheader={<ListSubheader>{organisation.name}</ListSubheader>}
          >
            {organisation.categories.map((categories) => (
              <ListItem
                key={categories._id}
                button
                onClick={() => select(categories._id)}
              >
                <ListItemText primary={categories.name} />
              </ListItem>
            ))}
          </List>
        ))}
      </>
    );
  };

  return (
    <Grid container spacing={0}>
      <Grid item md={12} xs={12}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100%" }}
        >
          <Box m={2}>
            <h1 className="text-alpha">
              <FormattedMessage id="selectCategory.content.header" />
            </h1>

            <h3 className="text-alpha">
              <FormattedMessage
                id="selectCategory.content.body"
                values={{ p: (...chunks) => <p>{chunks}</p> }}
              />
            </h3>

            <Grid container direction="row" justify="center" spacing={2}>
              <SelectorButtons />
            </Grid>

            <Grid container direction="row" justify="center" spacing={0}>
              <Box pt={1}>
                <FormattedMessage id="selectCategory.content.or" />
              </Box>
            </Grid>

            <Grid container direction="row" justify="center" spacing={0}>
              <Button onClick={() => history.push("/")}>
                <FormattedMessage id="selectCategory.buttons.back" />
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Category;
