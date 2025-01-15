import { useState } from "react";
import { Formik } from "formik";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { generateSplits } from "../utils";
import { Splits, Split } from "./Splits";
import { PaceForm } from "./PaceForm";
import { DistanceForm } from "./DistanceForm";
import { TimeForm } from "./TimeForm";
import { Unit, FormState } from "../types";

import styles from "./calculator.module.css";

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

  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Box className={styles.calculator}>
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {({ values, handleReset }) => {
            const { hours, minutes, seconds, distance, distanceUnit } = values;
            return (
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
                  <Button fullWidth variant="contained" onClick={handleReset}>
                    Reset
                  </Button>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      setSplits(
                        generateSplits({
                          hours,
                          minutes,
                          seconds,
                          distance,
                          distanceUnit,
                        })
                      )
                    }
                  >
                    Generate Splits
                  </Button>
                </Box>
              </>
            );
          }}
        </Formik>
      </Box>
      {splits.length > 0 && <Splits splits={splits} />}
    </Grid2>
  );
};
