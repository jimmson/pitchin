import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = {
  body: "#FFFFFF",
  primary: "#37474F",
  text: "#37474F",
  secondary: "#B0BEC5",
};

export const variables = {
  text_m: "14pt",
  weight_m: "400",
  radius_m: "2pt",
};

const green = "#72d2ab";

export const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h1: {
        fontWeight: 500,
      },
    },
    MuiDivider: {
      root: {
        height: "0.2rem",
        backgroundColor: green + "72",
      },
      middle: {
        marginLeft: "40%",
        marginRight: "40%",
      },
    },
  },
  palette: {
    primary: {
      main: green,
    },
  },
});
