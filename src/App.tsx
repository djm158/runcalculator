import "./styles.css";

import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
  adaptV4Theme,
} from "@mui/material/styles";
import { Calculator } from "./Calculator";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const theme = createTheme(
  adaptV4Theme({
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
  })
);

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      (
      <ThemeProvider theme={theme}>
        <Calculator />
      </ThemeProvider>
      )
    </StyledEngineProvider>
  );
};
