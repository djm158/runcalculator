import "./styles.css";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Calculator } from "./Calculator";

const theme = createTheme({
  overrides: {
    MuiSelect: {
      filled: {
        "&:focus": {
          background: "#fffcfc",
          borderRadius: "4px",
        },
        borderRadius: "4px",
      },
    },
    MuiInputBase: {
      input: {
        color: "#292d3a",
        backgroundColor: "#fffcfc",
        borderRadius: "4px",
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
