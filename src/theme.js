import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "rgb(46, 94, 160)",
    },
    secondary: {
      main: "rgb(220, 46, 40)",
    },
  },
  overrides: {
    MuiSlider: {
      thumb: {
        color: "white",
      },
      track: {
        color: "white",
      },
      rail: {
        color: "white",
      },
    },
  },
});
