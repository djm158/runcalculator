import { ChangeEvent, useRef, useState } from "react";
import {
  calculateDistance,
  calculatePace,
  calculateTime,
  MILES_TO_KILOMETERS,
  Unit,
} from "./calc";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0.8),
      width: 100,
    },
  },
  distanceGroup: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 120,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  // TOOD: theme this
  button: {
    backgroundColor: "#5178fc",
    marginLeft: theme.spacing(1),
  },
}));

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
  raceDistance: keyof typeof predefinedRaces | "";
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

export const Calculator = () => {
  const classes = useStyles();
  const inputLabel = useRef(null);
  interface Split {
    split: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

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

  const handleRaceChange = (event: ChangeEvent<{ value: unknown }>) => {
    const raceDistance =
      predefinedRaces[event.target.value as keyof typeof predefinedRaces] || 0;
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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Box className="calculator" p="2rem" borderRadius={5} bgcolor="#191f33">
        {/* TODO should these be three different forms? */}
        <form className={classes.root}>
          <p>Time</p>
          <Box display="flex" justifyContent="center" alignItems="center">
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
              color="primary"
              onClick={setTime}
              className={classes.button}
            >
              Calculate
            </Button>
          </Box>
        </form>
        <form className={classes.root}>
          <p>Pace</p>
          <Box display="flex" justifyContent="center" alignItems="center">
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
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="primary"
              onClick={setPace}
            >
              Calculate
            </Button>
          </Box>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel ref={inputLabel}>Unit</InputLabel>
            <Select
              labelId="pace-unit"
              id="pace-unit-select"
              name="paceUnit"
              value={formik.values.paceUnit}
              onChange={formik.handleChange}
              labelWidth={120}
            >
              <MenuItem value={Unit.MILES}>Miles</MenuItem>
              <MenuItem value={Unit.KILOMETERS}>Kilometers</MenuItem>
            </Select>
          </FormControl>
        </form>
        <form className={classes.distanceGroup}>
          <p>Distance</p>
          <Box display="flex" alignItems="center">
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
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel ref={inputLabel}>Unit</InputLabel>
              <Select
                labelId="distance-unit"
                id="unit-select"
                value={formik.values.distanceUnit}
                onChange={formik.handleChange}
                name="distanceUnit"
                labelWidth={120}
              >
                <MenuItem value={Unit.MILES}>Miles</MenuItem>
                <MenuItem value={Unit.KILOMETERS}>Kilometers</MenuItem>
              </Select>
            </FormControl>
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="primary"
              onClick={setDistance}
            >
              Calculate
            </Button>
          </Box>
          <FormControl variant="filled" className={classes.formControl}>
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
        </form>
        <Box mt={2}>
          <Button
            fullWidth
            className={classes.button}
            size="small"
            variant="contained"
            color="primary"
            onClick={formik.handleReset}
          >
            Reset
          </Button>
        </Box>
        <Box mt={2}>
          <Button
            fullWidth
            className={classes.button}
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setSplits(generateSplits())}
          >
            Generate Splits
          </Button>
        </Box>
      </Box>
      {splits.length > 0 && (
        <Box
          className="splits"
          p="2rem"
          borderRadius={5}
          bgcolor="#191f33"
          mt={2}
        >
          <table style={{ color: "#ffffff" }}>
            <thead>
              <tr>
                <th>Split</th>
                <th>Hours</th>
                <th>Minutes</th>
                <th>Seconds</th>
              </tr>
            </thead>
            <tbody>
              {splits.map((split, index) => (
                <tr key={index}>
                  <td>{split.split}</td>
                  <td>{split.hours}</td>
                  <td>{split.minutes}</td>
                  <td>{split.seconds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </Grid>
  );
};
