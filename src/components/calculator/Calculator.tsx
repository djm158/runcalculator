import { Formik } from "formik";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Unit, FormState } from "@/types";
import { generateSplits } from "@/utils";

import { DistanceForm } from "./DistanceForm";
import { PaceForm } from "./PaceForm";
import { Splits, Split } from "./Splits";
import { TimeForm } from "./TimeForm";

export const Calculator = ({
  containerClassName,
}: {
  containerClassName?: string;
}) => {
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
    <Card
      className={cn(
        "bg-white/30 dark:bg-black/30 backdrop-blur-lg max-w-3xl",
        containerClassName,
      )}
    >
      <CardHeader className="border-b">
        <CardTitle className="text-pink-600 dark:text-pink-300">
          Pace Calculator
        </CardTitle>
      </CardHeader>
      <div className="flex flex-col items-center justify-center p-6">
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {({ values, handleReset }) => {
            const { hours, minutes, seconds, distance, distanceUnit } = values;
            return (
              <>
                <div className="space-y-6 w-full">
                  <TimeForm />
                  <PaceForm />
                  <DistanceForm />
                </div>
                <Button className="w-full mt-8 mb-3" onClick={handleReset}>
                  Reset
                </Button>
                <Button
                  className="w-full"
                  variant="pink"
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
        {splits.length > 0 && <Splits splits={splits} />}
      </div>
    </Card>
  );
};
