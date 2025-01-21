import { useFormikContext } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FormState, RaceDistance, Unit } from "../types";
import { getTotalTimeInSeconds, calculateDistance } from "../utils/calc";
import { predefinedRaces, MILES_TO_KILOMETERS } from "../const";

import { TextField } from "./TextField";

export const DistanceForm = () => {
  const { setFieldValue, values, handleChange } = useFormikContext<FormState>();
  const {
    raceDistance,
    distance,
    hours,
    minutes,
    seconds,
    paceHours,
    paceMinutes,
    paceSeconds,
    distanceUnit,
    paceUnit,
  } = values;

  const handleRaceChange = (event: SelectChangeEvent<RaceDistance>) => {
    const newRaceDistance =
      predefinedRaces[event.target.value as RaceDistance] || 0;
    const distance =
      distanceUnit === Unit.MILES
        ? newRaceDistance / MILES_TO_KILOMETERS
        : newRaceDistance;
    setFieldValue("distance", distance);
    setFieldValue("raceDistance", event.target.value);
  };

  const setDistance = () => {
    const totalSeconds = getTotalTimeInSeconds(hours, minutes, seconds);
    const totalPaceSeconds = getTotalTimeInSeconds(
      paceHours,
      paceMinutes,
      paceSeconds,
    );
    const distance =
      totalPaceSeconds > 0
        ? calculateDistance(
            totalSeconds,
            totalPaceSeconds,
            paceUnit,
            distanceUnit,
          )
        : 0;
    setFieldValue("distance", distance);
  };
  return (
    <Box component="form">
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
          value={distance}
          onChange={handleChange}
          sx={{
            width: 120,
          }}
        />
        <FormControl variant="filled" sx={{ width: 120 }}>
          <InputLabel>Unit</InputLabel>
          <Select
            labelId="distance-unit"
            id="unit-select"
            value={distanceUnit}
            onChange={handleChange}
            name="distanceUnit"
          >
            <MenuItem value={Unit.MILES}>Miles</MenuItem>
            <MenuItem value={Unit.KILOMETERS}>Kilometers</MenuItem>
          </Select>
        </FormControl>
        <Button
          size="small"
          variant="contained"
          sx={{ marginLeft: 0.5 }}
          onClick={setDistance}
        >
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
          value={raceDistance}
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
