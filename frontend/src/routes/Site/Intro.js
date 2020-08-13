import React, { useState } from "react";
// import { FormattedMessage } from "react-intl";
import { LangBar, AppToolbar } from "../../components/Bar";
import useLocale, { setLocale } from "../../hooks/useLocale";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import InputIcon from "@material-ui/icons/Input";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  SvgIcon,
  Container,
  Divider,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Avatar,
} from "@material-ui/core";

import stepOne from "../../assets/step-1-image.png";
import stepTwo from "../../assets/step-2-image.png";
import greenpop from "../../assets/greenpop-logo-square.png";
import ladels from "../../assets/ladles-logo-square.png";

import { ReactComponent as AppStore } from "../../assets/appStore.svg";
import { ReactComponent as PlayStore } from "../../assets/playStore.svg";
import { ReactComponent as Logo } from "../../assets/logo-icon.svg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as PayPal } from "../../assets/paypal.svg";
import { ReactComponent as Bitcoin } from "../../assets/bitcoin.svg";
import { ReactComponent as QRCode } from "../../assets/qrCode.svg";

import { theme } from "../../styles/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "10%",
  },
  container: {
    padding: "10% 16px",
  },
  image: {
    display: "block",
    margin: "auto",
  },
  heart: {
    width: "80%",
    maxWidth: "322px",
    display: "block",
    margin: "auto",
  },
  reverse: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  center: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  partner: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

const Intro = () => {
  const classes = useStyles();
  const [introView, setIntroView] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [{ locale, locales, loading }] = useLocale();

  const handleIntroView = (event) => {
    setIntroView(!introView);
    event.preventDefault();
  };

  const handleDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppToolbar />
      {/* Hero */}
      <Grid container direction="column" className={classes.root}>
        <Container className={classes.container} maxWidth="lg">
          <Grid container spacing={2}>
            <Grid container item sm={4} xs={12}>
              {introView ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h1" color="primary">
                      PitchIn
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="textPrimary">
                      Find out how you can help out
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="textPrimary">
                      NGO's need help and you what to help out. PitchIn connects
                      the dots, giving you a ton of fun, rewarding volunteering
                      options in your community.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="textPrimary">
                      Some you even get rewarded for.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Link
                      href=""
                      variant="h6"
                      onClick={handleIntroView}
                      color="primary"
                      underline="none"
                    >
                      ⟶ About Us
                    </Link>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h1" color="primary">
                      About Us
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="textPrimary">
                      PitchIn is a collective of developers, designers and
                      creatives who were inspired by the Covid-19 pandemic to
                      empower individuals to connect and contribute to their
                      communities in a positive way.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="textPrimary">
                      There are organisation our there who are willing and able
                      to make a difference, all they need is help from their
                      community.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="textPrimary">
                      We are here to make it easy for the community to help
                      out..
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Link
                      href=""
                      variant="h6"
                      onClick={handleIntroView}
                      color="primary"
                      underline="none"
                    >
                      ⟶ Back
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>

        {/* Partners
        <Container className={classes.container} maxWidth="md">
          <Grid container spacing={2}   direction="row"  justify="space-around"  alignItems="center">
            <Grid item>
              <Avatar variant="square" alt="Greenpop" src={greenpop} className={classes.partner} />
            </Grid>
            <Grid item>
              <Avatar variant="square" alt="Ladles of Love" src={ladels} className={classes.partner} /> 
            </Grid>
          </Grid>
        </Container> */}

        {/* Get started */}
        <Container className={classes.container} maxWidth="lg" id="get-started">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2" align="center" color="primary">
                Getting started
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="textPrimary">
                Using PitchIn is free and only takes a few simple steps to get
                going
              </Typography>
            </Grid>
          </Grid>
        </Container>

        {/* Step 1 */}
        <Container className={classes.container} maxWidth="md">
          <Grid container spacing={4}>
            <Grid container item alignItems="center" md={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h2"
                    color="primary"
                    className={classes.center}
                  >
                    Step 1
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    color="primary"
                    className={classes.center}
                  >
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
                      <ListItem key={index} disableGutters>
                        <ListItemAvatar>
                          <SvgIcon>
                            <Logo />
                          </SvgIcon>
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography
                            component="span"
                            variant="h6"
                            color="textPrimary"
                          >
                            {text}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <img className={classes.image} src={stepOne} alt="Step One" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textPrimary" align="center">
                * PitchIn uses Zelos to connect you with the most important
                tasks in your area.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container item>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justify="center"
                  direction="row"
                >
                  <Grid item sx={6}>
                    <a
                      href="https://apps.apple.com/us/app/zelos-team-management/id1441089536"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AppStore />
                    </a>
                  </Grid>
                  <Grid item sx={6}>
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
        </Container>

        {/* Step 2 */}
        <Container className={classes.container} maxWidth="md">
          <Grid container spacing={4} className={classes.reverse}>
            <Grid item md={6} xs={12}>
              <img className={classes.image} src={stepTwo} alt="Step Two" />
            </Grid>
            <Grid container item alignItems="center" md={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h2"
                    color="primary"
                    className={classes.center}
                  >
                    Step 2
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    color="primary"
                    className={classes.center}
                  >
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
                      <ListItem key={index} disableGutters>
                        <ListItemAvatar>
                          <SvgIcon>
                            <Logo />
                          </SvgIcon>
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography
                            component="span"
                            variant="h6"
                            color="textPrimary"
                          >
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

        {/* Donate */}
        <Container id="donate" className={classes.container} maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Heart className={classes.heart} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2" align="center" color="primary">
                You're all heart!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                align="center"
                color="textPrimary"
              >
                PitchIn is a non-profit. We spend a lot of time, money and
                effort on PitchIn. Your donation goes a long way to helping us
                keep this service going and allowing us to pay our hardworking
                team a small living.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="textPrimary">
                How would you like to donate?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container item>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={6}>
                    <Dialog onClose={handleDialogOpen} open={dialogOpen}>
                      <DialogTitle>
                        <Typography variant="h2" align="center" color="primary">
                          Scan to send
                        </Typography>
                      </DialogTitle>
                      <DialogContent>
                        <QRCode />
                      </DialogContent>
                      <DialogActions>
                        <Alert
                          style={{ width: "100%" }}
                          icon={<InputIcon fontSize="inherit" />}
                          severity="success"
                          variant="outlined"
                        >
                          <AlertTitle>Address</AlertTitle>
                          35Ax7kLyoUFMaAriNFGUZVAoXY5iZ6BDFi
                        </Alert>
                      </DialogActions>
                    </Dialog>
                    <Bitcoin
                      className={classes.image}
                      style={{ cursor: "pointer" }}
                      onClick={handleDialogOpen}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <a
                      href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RFGGVYXWE7L36&source=url"
                      target="_blank"
                    >
                      <PayPal className={classes.image} />
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>

        {/* Help */}
        <Container className={classes.container} maxWidth="lg" id="need-help">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2" align="center" color="primary">
                Need Help?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="textPrimary">
                Email us and we'll guide you through the process
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" color="primary">
                hello@pitchin.io
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
