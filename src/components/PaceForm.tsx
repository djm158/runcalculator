import { useFormikContext } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import { getTotalTimeInSeconds, calculatePace } from "../utils/calc";
import { FormState } from "../types";
import { Unit } from "../types";

import { TextField } from "./TextField";

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

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
      <Select
        value={values.paceUnit}
        onValueChange={(value) =>
          handleChange({ target: { name: "paceUnit", value } })
        }
        name="paceUnit"
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Unit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Unit.MILES}>Miles</SelectItem>
          <SelectItem value={Unit.KILOMETERS}>Kilometers</SelectItem>
        </SelectContent>
      </Select>
    </Box>
  );
};
