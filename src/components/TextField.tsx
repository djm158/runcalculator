import MuiTextField, { TextFieldProps } from "@mui/material/TextField";

export const TextField = (props: TextFieldProps) => (
  <MuiTextField sx={{ width: 100 }} {...props} />
);
