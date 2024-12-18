import { useState } from "react";
import {
  calculateDistance,
  calculatePace,
  calculateTime,
  MILES_TO_KILOMETERS,
  Unit,
} from "./calc";

import Box from "@mui/material/Box";
import MuiButton, { ButtonProps } from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid2 from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { useFormik } from "formik";
import { Splits, Split } from "./Splits";

import styles from "./calculator.module.css";

type RaceDistance = keyof typeof predefinedRaces;

interface FormState {
  distanceUnit: Unit;
  distance: number | string;
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
  paceHours: number | string;
  paceMinutes: number | string;
  paceSeconds: number | string;
  paceUnit: Unit;
  raceDistance: RaceDistance | "";
}

const getTimeInSeconds = (
  hours: number | string,
  minutes: number | string,
  seconds: number | string
) => {
  const hrs = typeof hours === "string" ? 0 : hours;
  const mins = typeof minutes === "string" ? 0 : minutes;
  const secs = typeof seconds === "string" ? 0 : seconds;
  const total = hrs * 60 * 60 + mins * 60 + secs;
  return total;
};

const predefinedRaces = {
  "5k": 5,
  "10k": 10,
  "Half Marathon": 21.0975,
  Marathon: 42.195,
};

const Button = (props: ButtonProps) => (
  <MuiButton size="small" variant="contained" color="primary" {...props} />
);

const TextField = (props: TextFieldProps) => (
  <MuiTextField sx={{ width: 100 }} {...props} />
);

export const Calculator = () => {
  const [splits, setSplits] = useState<Split[]>([]);

  const formik = useFormik<FormState>({
    initialValues: {
      distanceUnit: Unit.MILES,
      distance: "",
      hours: "",
      minutes: "",
      seconds: "",
      paceHours: "",
      paceMinutes: "",
      paceSeconds: "",
      paceUnit: Unit.MILES,
      raceDistance: "",
    },
    onSubmit: (vals) => console.log(vals),
  });

  const getTotalPaceSeconds = (): number => {
    const { paceHours, paceMinutes, paceSeconds } = formik.values;
    const total = getTimeInSeconds(paceHours, paceMinutes, paceSeconds);
    return total;
  };

  const getTotalSeconds = (): number => {
    const { hours, minutes, seconds } = formik.values;
    const total = getTimeInSeconds(hours, minutes, seconds);
    return total;
  };

  const setPace = () => {
    const distance =
      typeof formik.values.distance === "string" ? 0 : formik.values.distance;
    if (distance === 0) return;
    const {
      seconds: secs,
      minutes: mins,
      hours: hrs,
    } = calculatePace(
      getTotalSeconds(),
      distance,
      formik.values.paceUnit,
      formik.values.distanceUnit
    );
    formik.setValues({
      ...formik.values,
      paceHours: hrs,
      paceMinutes: mins,
      paceSeconds: secs,
    });
  };

  const setTime = () => {
    const distance =
      typeof formik.values.distance === "string" ? 0 : formik.values.distance;
    if (distance === 0) return;

    const {
      seconds: secs,
      minutes: mins,
      hours: hrs,
    } = calculateTime(getTotalPaceSeconds(), distance);
    formik.setValues({
      ...formik.values,
      hours: hrs,
      minutes: mins,
      seconds: secs,
    });
  };

  const setDistance = () => {
    const totalSeconds = getTotalSeconds();
    const totalPaceSeconds = getTotalPaceSeconds();
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

  const handleRaceChange = (event: SelectChangeEvent<RaceDistance>) => {
    event.target.value;
    const raceDistance =
      // casting required due to https://github.com/mui/material-ui/issues/33399
      predefinedRaces[event.target.value as RaceDistance] || 0;
    const distance =
      formik.values.distanceUnit === Unit.MILES
        ? raceDistance / MILES_TO_KILOMETERS
        : raceDistance;
    formik.setFieldValue("distance", distance);
    formik.setFieldValue("raceDistance", event.target.value);
  };

  const generateSplits = () => {
    const distance =
      typeof formik.values.distance === "string" ? 0 : formik.values.distance;
    const totalPaceSeconds = getTotalPaceSeconds();
    const splits = [];
    for (let i = 1; i <= distance; i++) {
      const splitTime = calculateTime(totalPaceSeconds, i);
      splits.push({
        split: i,
        hours: splitTime.hours,
        minutes: splitTime.minutes,
        seconds: splitTime.seconds,
      });
    }
    return splits;
  };

  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Box
        className={styles.calculator}
        sx={{
          padding: "2rem",
          borderRadius: "5px",
          backgroundColor: "#191f33",
        }}
      >
        {/* TODO should these be three different forms? */}
        <Box component="form">
          <p>Time</p>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "& > div": { margin: 0.8 },
              "& > :first-child": { marginLeft: 0 },
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
            <Button sx={{ marginLeft: 0.5 }} onClick={setTime}>
              Calculate
            </Button>
          </Box>
        </Box>
        <Box component="form" sx={{ marginTop: 2 }}>
          <p>Pace</p>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "& > div": { margin: 0.8 },
              "& > :first-child": { marginLeft: 0 },
            }}
          >
            <TextField
              InputProps={{
                inputProps: { min: 0 },
              }}
              onChange={formik.handleChange}
              placeholder="Hrs"
              name="paceHours"
              type="number"
              value={formik.values.paceHours}
              variant="outlined"
            />
            <TextField
              InputProps={{
                inputProps: { min: 0, max: 59 },
              }}
              onChange={formik.handleChange}
              placeholder="Min"
              type="number"
              name="paceMinutes"
              value={formik.values.paceMinutes}
              variant="outlined"
            />
            <TextField
              InputProps={{
                inputProps: { min: 0, max: 59, step: 0.1 },
              }}
              onChange={formik.handleChange}
              placeholder="Sec"
              name="paceSeconds"
              type="number"
              value={formik.values.paceSeconds}
              variant="outlined"
            />
            <Button sx={{ marginLeft: 0.5 }} onClick={setPace}>
              Calculate
            </Button>
          </Box>
          <FormControl variant="filled" sx={{ width: 120, marginTop: 0.8 }}>
            <InputLabel>Unit</InputLabel>
            <Select
              labelId="pace-unit"
              id="pace-unit-select"
              name="paceUnit"
              value={formik.values.paceUnit}
              onChange={formik.handleChange}
            >
              <MenuItem value={Unit.MILES}>Miles</MenuItem>
              <MenuItem value={Unit.KILOMETERS}>Kilometers</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box component="form" sx={{ marginTop: 2 }}>
          <p>Distance</p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& > div": { margin: 0.8 },
              "& > :first-child": { marginLeft: 0 },
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
        <Box sx={{ marginTop: 2 }}>
          <Button fullWidth onClick={formik.handleReset}>
            Reset
          </Button>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Button fullWidth onClick={() => setSplits(generateSplits())}>
            Generate Splits
          </Button>
        </Box>
      </Box>
      {splits.length > 0 && <Splits splits={splits} />}
    </Grid2>
  );
};
