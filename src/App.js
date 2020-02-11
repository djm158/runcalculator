import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { makeStyles } from "@material-ui/core/styles";

import "./styles.css";

const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      filled: {
        "&:focus": {
          background: "#fffcfc",
          borderRadius: "4px"
        },
        borderRadius: "4px"
      }
    },
    MuiInputBase: {
      input: {
        color: "#292d3a",
        backgroundColor: "#fffcfc",
        borderRadius: "4px"
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0.8),
      width: 70
    }
  },
  distanceGroup: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 98
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  button: {
    backgroundColor: "#5178fc",
    marginLeft: theme.spacing(1)
  },
  input: {
    color: "#292d3a",
    backgroundColor: "#fffcfc"
  }
}));

export default function App() {
  const classes = useStyles();
  const [unit, setUnit] = useState("Miles");
  const [seconds, setSeconds] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [distance, setDistance] = useState("");
  const [paceSeconds, setPaceSeconds] = useState("");
  const [paceMinutes, setPaceMinutes] = useState("");
  const [paceHours, setPaceHours] = useState("");
  const inputLabel = React.useRef(null);

  // TODO: pull these out for easier testing
  const calculatePace = () => {
    if (distance === 0) return;
    const totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    const secondsPerDistance = totalSeconds / distance;
    const mins = Math.floor(secondsPerDistance / 60);
    setPaceHours(Math.floor(secondsPerDistance / 60 ** 2));
    setPaceMinutes(mins);
    setPaceSeconds((secondsPerDistance / 60 - mins) * 60);
  };

  const calculateTime = () => {
    const totalPaceSeconds =
      paceHours * 60 * 60 + paceMinutes * 60 + paceSeconds;
    const time = totalPaceSeconds * distance;
    setHours(Math.floor(time / 60 ** 2));
    setMinutes(Math.floor(time / 60 - Math.floor(time / 60 ** 2)));
    setSeconds((time / 60 - time / 60) * 60);
  };

  const calculateDistance = () => {
    const totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    const totalPaceSeconds =
      paceHours * 60 * 60 + paceMinutes * 60 + paceSeconds;
    setDistance(totalSeconds / totalPaceSeconds);
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
        <div className="calculator">
          <form className={classes.root}>
            <p>Time</p>
            <Box display="flex" justifyContent="center" alignItems="center">
              <TextField
                InputProps={{
                  inputProps: { min: 0 }
                }}
                placeholder="Hrs"
                variant="outlined"
                type="number"
                value={hours}
                onChange={e => setHours(parseInt(e.target.value))}
              />
              <TextField
                InputProps={{
                  inputProps: { min: 0, max: 59 }
                }}
                placeholder="Min"
                variant="outlined"
                type="number"
                value={minutes}
                onChange={e => setMinutes(parseInt(e.target.value))}
              />
              <TextField
                InputProps={{
                  inputProps: { min: 0, max: 59 }
                }}
                placeholder="Sec"
                variant="outlined"
                type="number"
                value={seconds}
                onChange={e => setSeconds(parseInt(e.target.value))}
              />
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={calculateTime}
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
                  inputProps: { min: 0 }
                }}
                onChange={e => setPaceHours(parseInt(e.target.value))}
                placeholder="Hrs"
                type="number"
                value={paceHours}
                variant="outlined"
              />
              <TextField
                InputProps={{
                  inputProps: { min: 0, max: 59 }
                }}
                onChange={e => setPaceMinutes(parseInt(e.target.value))}
                placeholder="Min"
                type="number"
                value={paceMinutes}
                variant="outlined"
              />
              <TextField
                InputProps={{
                  inputProps: { min: 0, max: 59 }
                }}
                onChange={e => setPaceSeconds(parseInt(e.target.value))}
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
                onClick={calculatePace}
              >
                Calculate
              </Button>
            </Box>
          </form>
          <form className={classes.distanceGroup}>
            <p>Distance</p>
            <Box display="flex" justifyContent="center" alignItems="center">
              <TextField
                InputProps={{
                  inputProps: { min: 0 }
                }}
                placeholder="Distance"
                variant="outlined"
                type="number"
                value={distance}
                onChange={e => setDistance(parseInt(e.target.value))}
              />
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel ref={inputLabel}>Unit</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="unit-select"
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
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
                onClick={calculateDistance}
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
        </div>
      </Grid>
    </ThemeProvider>
  );
}
