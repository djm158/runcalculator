import { useFormikContext } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { getTotalTimeInSeconds, calculatePace } from "../utils/calc";
import { FormState } from "../types";
import { Unit } from "../types";

import { TextField } from "./TextField";

export const PaceForm = () => {
  const { values, handleChange, setValues } = useFormikContext<FormState>();

  const setPace = () => {
    const distance = typeof values.distance === "string" ? 0 : values.distance;
    if (distance === 0) return;
    const {
      seconds: secs,
      minutes: mins,
      hours: hrs,
    } = calculatePace(
      getTotalTimeInSeconds(values.hours, values.minutes, values.seconds),
      distance,
      values.paceUnit,
      values.distanceUnit,
    );
    setValues({
      ...values,
      paceHours: hrs,
      paceMinutes: mins,
      paceSeconds: secs,
    });
  };
  return (
    <Box component="form">
      <p>Pace</p>
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
          onChange={handleChange}
          placeholder="Hrs"
          name="paceHours"
          type="number"
          value={values.paceHours}
          variant="outlined"
        />
        <TextField
          InputProps={{
            inputProps: { min: 0, max: 59 },
          }}
          onChange={handleChange}
          placeholder="Min"
          type="number"
          name="paceMinutes"
          value={values.paceMinutes}
          variant="outlined"
        />
        <TextField
          InputProps={{
            inputProps: { min: 0, max: 59, step: 0.1 },
          }}
          onChange={handleChange}
          placeholder="Sec"
          name="paceSeconds"
          type="number"
          value={values.paceSeconds}
          variant="outlined"
        />
        <Button
          size="small"
          variant="contained"
          sx={{ marginLeft: 0.5 }}
          onClick={setPace}
        >
          Calculate
        </Button>
      </Box>
      <FormControl variant="filled" sx={{ width: 120, marginTop: 0.8 }}>
        <InputLabel>Unit</InputLabel>
        <Select
          labelId="pace-unit"
          id="pace-unit-select"
          name="paceUnit"
          value={values.paceUnit}
          onChange={handleChange}
        >
          <MenuItem value={Unit.MILES}>Miles</MenuItem>
          <MenuItem value={Unit.KILOMETERS}>Kilometers</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
