import { ChangeEvent, useRef } from "react";
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

export const Calculator = () => {
  const classes = useStyles();
  const inputLabel = useRef(null);

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
    },
    onSubmit: (vals) => console.log(vals),
  });

  // any bc of how material ui handles change event types
  // https://stackoverflow.com/questions/58675993/typescript-react-select-onchange-handler-type-error
  const handleDistanceUnitChange = (e: any) => {
    console.log(e.value);
    const { distance, distanceUnit } = formik.values;
    const newValue = e.target.value;
    if (typeof distance !== "string") {
      if (distanceUnit === Unit.MILES && newValue === Unit.KILOMETERS) {
        formik.setFieldValue("distance", distance / MILES_TO_KILOMETERS);
      } else if (distanceUnit === Unit.KILOMETERS && newValue === Unit.MILES) {
        formik.setFieldValue("distance", distance * MILES_TO_KILOMETERS);
      }
    }
    formik.handleChange(e);
  };

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
                onChange={handleDistanceUnitChange}
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
      </Box>
    </Grid>
  );
};
