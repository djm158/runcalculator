import { useState } from "react";
import { Formik } from "formik";

import { generateSplits } from "../utils";
import { Unit, FormState } from "../types";

import { Splits, Split } from "./Splits";
import { PaceForm } from "./PaceForm";
import { DistanceForm } from "./DistanceForm";
import { TimeForm } from "./TimeForm";

import { Button } from "@/components/ui/button";

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
    <div className="min-h-[90vh] flex flex-col items-center justify-center">
      <div className="rounded-lg bg-[#191f33] p-2 xs:p-8 xs:max-w-full">
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {({ values, handleReset }) => {
            const { hours, minutes, seconds, distance, distanceUnit } = values;
            return (
              <>
                <div className="space-y-6">
                  <TimeForm />
                  <PaceForm />
                  <DistanceForm />
                </div>
                <Button className="w-full mt-8 mb-3" onClick={handleReset}>
                  Reset
                </Button>
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() =>
                    setSplits(
                      generateSplits({
                        hours,
                        minutes,
                        seconds,
                        distance,
                        distanceUnit,
                      }),
                    )
                  }
                >
                  Generate Splits
                </Button>
              </>
            );
          }}
        </Formik>
      </div>
      {splits.length > 0 && <Splits splits={splits} />}
    </div>
  );
};
