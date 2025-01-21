import { useFormikContext } from "formik";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { getTotalTimeInSeconds, calculatePace } from "../utils/calc";
import { FormState } from "../types";
import { Unit } from "../types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div>
      <p>Pace</p>
      <div className="flex items-center">
        <Input
          placeholder="Hrs"
          name="paceHours"
          type="number"
          value={values.paceHours}
          onChange={handleChange}
          min={0}
          className="w-20 h-14"
        />
        <Input
          placeholder="Min"
          name="paceMinutes"
          type="number"
          value={values.paceMinutes}
          onChange={handleChange}
          min={0}
          max={59}
          className="w-20 h-14"
        />
        <Input
          placeholder="Sec"
          name="paceSeconds"
          type="number"
          value={values.paceSeconds}
          onChange={handleChange}
          min={0}
          max={59}
          className="w-20 h-14"
        />
        <Button size="sm" className="ml-3" onClick={setPace}>
          Calculate
        </Button>
      </div>
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
    </div>
  );
};
