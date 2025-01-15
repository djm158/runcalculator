import { useFormikContext } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { FormState } from "../types";
import { TextField } from "./TextField";
import { calculateTime, getTotalTimeInSeconds } from "../utils/calc";

export const TimeForm = () => {
  const formik = useFormikContext<FormState>();

  const setTime = () => {
    const distance =
      typeof formik.values.distance === "string" ? 0 : formik.values.distance;
    if (distance === 0) return;

    const { paceHours, paceMinutes, paceSeconds } = formik.values;
    const {
      seconds: secs,
      minutes: mins,
      hours: hrs,
    } = calculateTime(
      getTotalTimeInSeconds(paceHours, paceMinutes, paceSeconds),
      distance,
    );
    formik.setValues({
      ...formik.values,
      hours: hrs,
      minutes: mins,
      seconds: secs,
    });
  };
  return (
    <Box component="form">
      <p>Time</p>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& > div": { margin: 0.8 },
          "& > :first-of-type": { marginLeft: 0 },
        }}
      >
        <TextField
          InputProps={{
            inputProps: { min: 0 },
          }}
          placeholder="Hrs"
          name="hours"
          variant="outlined"
          type="number"
          value={formik.values.hours}
          onChange={formik.handleChange}
        />
        <TextField
          InputProps={{
            inputProps: { min: 0, max: 59 },
          }}
          placeholder="Min"
          name="minutes"
          variant="outlined"
          type="number"
          value={formik.values.minutes}
          onChange={formik.handleChange}
        />
        <TextField
          InputProps={{
            inputProps: { min: 0, max: 59, step: 0.1 },
          }}
          placeholder="Sec"
          variant="outlined"
          type="number"
          name="seconds"
          value={formik.values.seconds}
          onChange={formik.handleChange}
        />
        <Button
          size="small"
          variant="contained"
          sx={{ marginLeft: 0.5 }}
          onClick={setTime}
        >
          Calculate
        </Button>
      </Box>
    </Box>
  );
};
