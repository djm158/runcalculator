import "./styles.css";

import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { calculateDistance, calculatePace, calculateTime } from "./calc";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export enum Unit {
  MILES = "Miles",
  KILOMETERS = "Kilometers",
}

const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      filled: {
        "&:focus": {
          background: "#fffcfc",
          borderRadius: "4px",
        },
        borderRadius: "4px",
      },
    },
    MuiInputBase: {
      input: {
        color: "#292d3a",
        backgroundColor: "#fffcfc",
        borderRadius: "4px",
      },
    },
  },
});

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

export const App = () => {
  const classes = useStyles();
  const [distance, setDistance] = useState<string | number>("");
  const [distanceUnit, setDistanceUnit] = useState(Unit.MILES);
  const [hours, setHours] = useState<string | number>("");
  const [minutes, setMinutes] = useState<string | number>("");
  const [paceHours, setPaceHours] = useState<string | number>("");
  const [paceMinutes, setPaceMinutes] = useState<string | number>("");
  const [paceSeconds, setPaceSeconds] = useState<string | number>("");
  const [paceUnit, setPaceUnit] = useState(Unit.MILES);
  const [seconds, setSeconds] = useState<string | number>("");
  const inputLabel = React.useRef(null);

  // TODO: store time as object and abstract this logic
  // maybe also use a time lib like moment
  const getTotalPaceSeconds = (): number => {
    return (
      parseInt(paceHours as string) * 60 * 60 +
      parseInt(paceMinutes as string) * 60 +
      parseFloat(paceSeconds as string)
    );
  };

  const getTotalSeconds = (): number =>
    parseInt(hours as string) * 60 * 60 +
    parseInt(minutes as string) * 60 +
    parseInt(seconds as string);

  const setPace = () => {
    if (distance === 0) return;
    const { seconds: secs, minutes: mins, hours: hrs } = calculatePace(
      getTotalSeconds(),
      parseFloat(distance as string),
      paceUnit,
      distanceUnit
    );
    setPaceHours(hrs);
    setPaceMinutes(mins);
    setPaceSeconds(secs);
  };

  const setTime = () => {
    const { seconds: secs, minutes: mins, hours: hrs } = calculateTime(
      getTotalPaceSeconds(),
      parseFloat(distance as string)
    );
    setHours(hrs);
    setMinutes(mins);
    setSeconds(secs);
  };

  const reset = () => {
    setSeconds("");
    setMinutes("");
    setHours("");
    setPaceSeconds("");
    setPaceMinutes("");
    setPaceHours("");
    setDistance("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
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
                variant="outlined"
                type="number"
                value={hours}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setHours(parseInt(e.target.value))
                }
              />
              <TextField
                InputProps={{
                  inputProps: { min: 0, max: 59 },
                }}
                placeholder="Min"
                variant="outlined"
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value))}
              />
              <TextField
                InputProps={{
                  inputProps: { min: 0, max: 59, step: 0.1 },
                }}
                placeholder="Sec"
                variant="outlined"
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
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
                onChange={(e) => setPaceHours(parseInt(e.target.value))}
                placeholder="Hrs"
                type="number"
                value={paceHours}
                variant="outlined"
              />
              <TextField
                InputProps={{
                  inputProps: { min: 0, max: 59 },
                }}
                onChange={(e) => setPaceMinutes(parseInt(e.target.value))}
                placeholder="Min"
                type="number"
                value={paceMinutes}
                variant="outlined"
              />
              <TextField
                InputProps={{
                  inputProps: { min: 0, max: 59, step: 0.1 },
                }}
                onChange={(e) => setPaceSeconds(e.target.value)}
                placeholder="Sec"
                type="number"
                value={paceSeconds}
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
                value={paceUnit}
                onChange={(
                  e: React.ChangeEvent<{
                    name?: string | undefined;
                    value: unknown;
                  }>
                ) => setPaceUnit(e.target.value as Unit)}
                labelWidth={120}
              >
                <MenuItem value={Unit.MILES}>Miles</MenuItem>
                <MenuItem value={Unit.KILOMETERS}>Kilometers</MenuItem>
              </Select>
            </FormControl>
            e.target.value
          </form>
          <form className={classes.distanceGroup}>
            <p>Distance</p>
            <Box display="flex" alignItems="center">
              <TextField
                InputProps={{
                  inputProps: { min: 0, step: 0.1 },
                }}
                placeholder="Distance"
                variant="outlined"
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel ref={inputLabel}>Unit</InputLabel>
                <Select
                  labelId="distance-unit"
                  id="unit-select"
                  value={distanceUnit}
                  onChange={(
                    e: React.ChangeEvent<{
                      name?: string | undefined;
                      value: unknown;
                    }>
                  ) => setDistanceUnit(e.target.value as Unit)}
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
                onClick={() =>
                  setDistance(
                    calculateDistance(
                      getTotalSeconds(),
                      getTotalPaceSeconds(),
                      paceUnit,
                      distanceUnit
                    )
                  )
                }
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
              onClick={reset}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
