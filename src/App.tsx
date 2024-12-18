import "./styles.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Calculator } from "./Calculator";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#5178fc",
        },
      },
    },
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
