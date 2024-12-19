import "./styles.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Calculator } from "./Calculator";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5178fc",
      light: "#7393FC",
      dark: "#3854B0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
      light: "#F73378",
      dark: "#AB003C",
      contrastText: "#fff",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#292d3a",
          backgroundColor: "#fffcfc",
          borderRadius: "4px",
        },
      },
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Calculator />
    </ThemeProvider>
  );
};
