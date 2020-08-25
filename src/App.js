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

export default function App() {
  const classes = useStyles();
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("Miles");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [paceHours, setPaceHours] = useState("");
  const [paceMinutes, setPaceMinutes] = useState("");
  const [paceSeconds, setPaceSeconds] = useState("");
  const [paceUnit, setPaceUnit] = useState("Miles");
  const [seconds, setSeconds] = useState("");
  const inputLabel = React.useRef(null);


  // TODO: store time as object and abstract this logic
  // maybe also use a time lib like moment
  const getTotalPaceSeconds = () => {
    return paceHours * 60 * 60 + paceMinutes * 60 + parseFloat(paceSeconds);
  };

  const getTotalSeconds = () => hours * 60 * 60 + minutes * 60 + seconds;

  const setPace = () => {
    if (distance === 0) return;
    const { seconds: secs, minutes: mins, hours: hrs } = calculatePace(
      getTotalSeconds(),
      parseFloat(distance),
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
      parseFloat(distance)
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
                onChange={(e) => setHours(parseInt(e.target.value))}
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
                  inputProps: { min: 0, max: 59 },
                }}
                placeholder="Sec"
                variant="outlined"
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                step={0.1}
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
                  inputProps: { min: 0, max: 59 },
                }}
                onChange={(e) => setPaceSeconds(e.target.value)}
                placeholder="Sec"
                type="number"
                value={paceSeconds}
                variant="outlined"
                step={0.1}
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
                onChange={(e) => setPaceUnit(e.target.value)}
                labelWidth={120}
              >
                <MenuItem value={"Miles"}>Miles</MenuItem>
                <MenuItem value={"Kilometers"}>Kilometers</MenuItem>
              </Select>
            </FormControl>
          </form>
          <form className={classes.distanceGroup}>
            <p>Distance</p>
            <Box display="flex" alignItems="center">
              <TextField
                InputProps={{
                  inputProps: { min: 0 },
                }}
                placeholder="Distance"
                variant="outlined"
                type="number"
                value={distance}
                step={0.1}
                onChange={(e) => setDistance(e.target.value)}
              />
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel ref={inputLabel}>Unit</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="unit-select"
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value)}
                  labelWidth={120}
                >
                  <MenuItem value={"Miles"}>Miles</MenuItem>
                  <MenuItem value={"Kilometers"}>Kilometers</MenuItem>
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
}
