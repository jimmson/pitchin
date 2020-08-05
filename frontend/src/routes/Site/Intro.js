import React from "react";
// import { FormattedMessage } from "react-intl";
import { Typography, Grid } from "@material-ui/core";
import { LangBar, AppToolbar } from "../../components/Bar";
import useLocale, { setLocale } from "../../hooks/useLocale";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  SvgIcon,
  Container,
  Divider,
} from "@material-ui/core";

import stepOne from "../../assets/step-1-image.png";
import stepTwo from "../../assets/step-2-image.png";

import { ReactComponent as AppStore } from "../../assets/appStore.svg";
import { ReactComponent as PlayStore } from "../../assets/playStore.svg";
import { ReactComponent as Logo } from "../../assets/logo-icon.svg";

import { theme } from "../../styles/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "96px",
  },
  container: {
    padding: "96px 16px",
  },
}));

const Intro = () => {
  const classes = useStyles();
  const [{ locale, locales, loading }] = useLocale();

  return (
    <ThemeProvider theme={theme}>
      <AppToolbar />
      <Grid container direction="column" className={classes.root}>
        <Container className={classes.container} maxWidth="lg">
          <Grid container spacing={2}>
            <Grid container item md={4} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h1" color="primary">
                    PitchIn
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Find out how you can help out
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    NGO's need help and you what to help out. PitchIn connects
                    the dots, giving you a ton of fun, rewarding volunteering
                    options in your community.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Some you even get rewarded for.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary">
                    ⟶ So, how does it work?
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>

        <Container className={classes.container} maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" align="center" color="primary">
                Getting started
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Using PitchIn is free and only takes a few simple steps to get
                going
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Container className={classes.container} maxWidth="md">
          <Grid container spacing={4}>
            <Grid container item alignItems="center" md={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3" color="primary">
                    Step 1
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" color="primary">
                    Download Zelos
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <List dense={true}>
                    {[
                      `Open the App or Play store`,
                      `Search "Zelos"`,
                      `Install the Zelos Team Managment app`,
                    ].map((text, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <SvgIcon>
                            <Logo />
                          </SvgIcon>
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography component="span" variant="h6">
                            {text}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    * PitchIn uses Zelos to connect you with the most important
                    tasks in your area.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container item alignItems="center">
                    <Grid container spacing={2}>
                      <Grid item>
                        <a
                          href="https://apps.apple.com/us/app/zelos-team-management/id1441089536"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AppStore />
                        </a>
                      </Grid>
                      <Grid item>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.zelos.client&hl=en"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <PlayStore />
                        </a>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <img src={stepOne} alt="Step One" />
            </Grid>
          </Grid>
        </Container>

        <Container className={classes.container} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <img src={stepTwo} alt="Step Two" />
            </Grid>
            <Grid container item alignItems="center" md={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3" color="primary">
                    Step 2
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" color="primary">
                    Find your location
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <List dense={true}>
                    {[
                      `Search for the "PitchIn" workspace in Zelos`,
                      `Join the closest Group in your area`,
                      `Browse tasks and PitchIn`,
                    ].map((text, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <SvgIcon>
                            <Logo />
                          </SvgIcon>
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography component="span" variant="h6">
                            {text}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>

        <Container className={classes.container} maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" align="center" color="primary">
                Need Help?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Whatsapp us and we'll guide you through the process
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" color="primary">
                +27 82 337 3796
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <footer className="">
          <Grid container justify="flex-end" spacing={2}>
            <Grid item xs={3}>
              <Typography variant="caption">
                © Copyright Pitchin SA 2020
              </Typography>
            </Grid>
          </Grid>

          {!loading && (
            <Box p={2}>
              <LangBar
                locales={locales}
                selectLanguage={(languageCode) => setLocale(languageCode)}
                current={locale}
              />
            </Box>
          )}
        </footer>
      </Grid>
    </ThemeProvider>
  );
};

export default Intro;
