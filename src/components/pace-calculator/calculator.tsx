import { Formik } from "formik";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Unit, FormState } from "@/types";

import { Distance } from "./distance";
import { Pace } from "./pace";
import { Time } from "./time";

export const Calculator = ({
  containerClassName,
}: {
  containerClassName?: string;
}) => {
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
        "bg-white/30 dark:bg-black/30 backdrop-blur-lg",
        containerClassName,
      )}
    >
      <CardHeader className="border-b">
        <CardTitle className="text-pink-600 dark:text-pink-300">
          Pace Calculator
        </CardTitle>
      </CardHeader>
      <div className="flex flex-col items-center justify-center p-3 sm:p-6">
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {({ handleReset }) => {
            return (
              <>
                <div className="space-y-3 md:space-y-6 w-full">
                  <Distance />
                  <Time />
                  <Pace />
                </div>

                <div className="flex flex-col gap-4 mt-4 w-full">
                  <Button
                    variant="outline"
                    className="border-pink-500 text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-950"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </div>
              </>
            );
          }}
        </Formik>
      </div>
    </Card>
  );
};
