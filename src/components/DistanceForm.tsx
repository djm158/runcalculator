import { useFormikContext } from "formik";
import { predefinedRaces, MILES_TO_KILOMETERS } from "../const";
import { getTotalTimeInSeconds, calculateDistance } from "../calc";
import { FormState, RaceDistance, Unit } from "../types";
import { TextField } from "./TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "./Button";

export const DistanceForm = () => {
  const formik = useFormikContext<FormState>();
  const values = formik.values;

  const handleRaceChange = (event: SelectChangeEvent<RaceDistance>) => {
    const raceDistance =
      predefinedRaces[event.target.value as RaceDistance] || 0;
    const distance =
      formik.values.distanceUnit === Unit.MILES
        ? raceDistance / MILES_TO_KILOMETERS
        : raceDistance;
    formik.setFieldValue("distance", distance);
    formik.setFieldValue("raceDistance", event.target.value);
  };

  const setDistance = () => {
    const totalSeconds = getTotalTimeInSeconds(
      values.hours,
      values.minutes,
      values.seconds
    );
    const totalPaceSeconds = getTotalTimeInSeconds(
      values.paceHours,
      values.paceMinutes,
      values.paceSeconds
    );
    const distance =
      totalPaceSeconds > 0
        ? calculateDistance(
            totalSeconds,
            totalPaceSeconds,
            formik.values.paceUnit,
            formik.values.distanceUnit
          )
        : 0;
    formik.setFieldValue("distance", distance);
  };
  return (
    <Box component="form" sx={{ marginTop: 2 }}>
      <p>Distance</p>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "& > div": { margin: 0.8 },
          "& > :first-of-type": { marginLeft: 0 },
        }}
      >
        <TextField
          InputProps={{
            inputProps: { min: 0, step: 0.1 },
          }}
          placeholder="Distance"
          name="distance"
          variant="outlined"
          type="number"
          value={formik.values.distance}
          onChange={formik.handleChange}
          sx={{
            width: 120,
          }}
        />
        <FormControl variant="filled" sx={{ width: 120 }}>
          <InputLabel>Unit</InputLabel>
          <Select
            labelId="distance-unit"
            id="unit-select"
            value={formik.values.distanceUnit}
            onChange={formik.handleChange}
            name="distanceUnit"
          >
            <MenuItem value={Unit.MILES}>Miles</MenuItem>
            <MenuItem value={Unit.KILOMETERS}>Kilometers</MenuItem>
          </Select>
        </FormControl>
        <Button sx={{ marginLeft: 0.5 }} onClick={setDistance}>
          Calculate
        </Button>
      </Box>

      <FormControl variant="filled" sx={{ width: 120, marginTop: 0.8 }}>
        <InputLabel>Race</InputLabel>
        <Select
          labelId="race-select"
          id="race-select"
          onChange={handleRaceChange}
          displayEmpty
          value={formik.values.raceDistance}
        >
          {Object.keys(predefinedRaces).map((race) => (
            <MenuItem key={race} value={race}>
              {race}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
