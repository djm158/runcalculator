import { useState } from "react";
import { getTotalTimeInSeconds, calculateTime } from "./calc";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import { Formik, useFormik } from "formik";

import { Splits, Split } from "./Splits";
import { PaceForm, DistanceForm, TimeForm, Button } from "./components";

import styles from "./calculator.module.css";
import { Unit, FormState } from "./types";

export const Calculator = () => {
  const [splits, setSplits] = useState<Split[]>([]);

  const initialValues: FormState = {
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
  };

  const generateSplits = ({
    paceHours,
    paceMinutes,
    paceSeconds,
    distance,
  }: {
    paceHours: number | string;
    paceMinutes: number | string;
    paceSeconds: number | string;
    distance: number | string;
  }) => {
    const totalPaceSeconds = getTotalTimeInSeconds(
      paceHours,
      paceMinutes,
      paceSeconds
    );
    const splits = [];
    const d = typeof distance === "string" ? 0 : distance;
    for (let i = 1; i <= d; i++) {
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
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {({ values, handleReset }) => (
            <>
              <Box
                sx={{
                  "& > *": { marginBottom: 3 },
                }}
              >
                <TimeForm />
                <PaceForm />
                <DistanceForm />
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <Button fullWidth onClick={handleReset}>
                  Reset
                </Button>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <Button
                  fullWidth
                  color="secondary"
                  onClick={() =>
                    setSplits(
                      generateSplits({
                        paceHours: values.paceHours,
                        paceMinutes: values.paceMinutes,
                        paceSeconds: values.paceSeconds,
                        distance: values.distance,
                      })
                    )
                  }
                >
                  Generate Splits
                </Button>
              </Box>
            </>
          )}
        </Formik>
      </Box>
      {splits.length > 0 && <Splits splits={splits} />}
    </Grid2>
  );
};
