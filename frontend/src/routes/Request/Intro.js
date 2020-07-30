import React from "react";
// import { FormattedMessage } from "react-intl";
import { Typography, Grid } from "@material-ui/core";
import { LangBar, AppToolbar } from "../../components/Bar";
import useLocale, { setLocale } from "../../hooks/useLocale";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import stepOne from "../../assets/step-1-image.png";
import stepTwo from "../../assets/step-2-image.png";

import { ReactComponent as AppStore } from "../../assets/appStore.svg";
import { ReactComponent as PlayStore } from "../../assets/playStore.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // display: "flex",
    // justifyContent: "center",
    // "& > *": {
    //   margin: theme.spacing(1),
    // },
  },
  intro: {
    padding: "4rem",
  },
}));

const Intro = () => {
  const classes = useStyles();
  const [{ locale, locales, loading }] = useLocale();

  return (
    <div>
      <AppToolbar />
      <Grid container className={classes.root}>
        <section className="wide hero">
          <Grid container spacing={2}>
            <Grid container item md={4} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">PitchIn</Typography>
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
                  <Typography variant="h6">⟶ how does it work</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </section>

        <section className="narrow">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" align="center">
                Get Started
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Using PitchIn is free and only takes a few steps to get started
              </Typography>
            </Grid>
          </Grid>
        </section>

        <section className="narrow">
          <Grid container spacing={4}>
            <Grid container item alignItems="center" md={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Step 1</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4">Download Zelos</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Get Zelos through the App or Play store.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    *PitchIn use Zelos to connect you with the most important
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
                          <AppStore className="app-landing__link" />
                        </a>
                      </Grid>
                      <Grid item>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.zelos.client&hl=en"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <PlayStore className="app-landing__link" />
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
        </section>

        <section className="narrow">
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <img src={stepTwo} alt="Step Two" />
            </Grid>
            <Grid container item alignItems="center" md={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Step 2</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4">Find your location</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Search for the "PitchIn" workspace in Zelos.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Join the closest Group in your area.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Browse tasks an PitchIn.</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </section>

        <section className="wide">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" align="center">
                Need Help?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Whatsapp us and we will guide you through getting started.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                +27 82 337 3796
              </Typography>
            </Grid>
          </Grid>
        </section>

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
    </div>
  );
};

export default Intro;
