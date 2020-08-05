import React, { useContext } from "react";
import { useFormikContext } from "formik";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import { RequestOptionsContext } from "./RequestWrapper";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
  },
}));

function Category() {
  const classes = useStyles();
  const { categories } = useContext(RequestOptionsContext);
  const { setFieldValue } = useFormikContext();

  function select(id, name) {
    setFieldValue("category", id);
    setFieldValue("name", name);
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
                onClick={() => select(categories._id, organisation.name)}
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
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <Typography variant="h4" color="primary">
          <FormattedMessage id="selectCategory.content.header" />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          <FormattedMessage
            id="selectCategory.content.body"
            values={{ p: (...chunks) => <p>{chunks}</p> }}
          />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SelectorButtons />
      </Grid>
      <Grid item xs={12}>
        <FormattedMessage id="selectCategory.content.or" />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => history.push("/")}>
          <FormattedMessage id="selectCategory.buttons.back" />
        </Button>
      </Grid>
    </Grid>
  );
}

export default Category;
