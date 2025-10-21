import Roboto from "./../assets/fonts/roboto.ttf";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    pearl: Palette["primary"];
  }
  interface PaletteOptions {
    pearl?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    pearl: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff00ff",
      light: "#003c58",
      dark: "#0d1d1e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1f4d5d",
      light: "#327d96",
      dark: "#0c1f25",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});

export default theme;
