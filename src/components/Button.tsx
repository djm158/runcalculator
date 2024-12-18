import MuiButton, { ButtonProps } from "@mui/material/Button";

export const Button = (props: ButtonProps) => (
  <MuiButton size="small" variant="contained" {...props} />
);
