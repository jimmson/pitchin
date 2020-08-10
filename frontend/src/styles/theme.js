import { createMuiTheme } from "@material-ui/core/styles";

const green = "#72d2ab";

export const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h1: {
        fontWeight: 500,
      },
      h2: {
        fontWeight: 400,
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
    text: {
      primary: "#5e5e5e",
    },
  },
});
