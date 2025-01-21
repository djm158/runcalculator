import { useFormikContext } from "formik";

import { FormState } from "../types";
import { calculateTime, getTotalTimeInSeconds } from "../utils/calc";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TimeForm = () => {
  const formik = useFormikContext<FormState>();

  const setTime = () => {
    const distance =
      typeof formik.values.distance === "string" ? 0 : formik.values.distance;
    if (distance === 0) return;

    const { paceHours, paceMinutes, paceSeconds } = formik.values;
    const {
      seconds: secs,
      minutes: mins,
      hours: hrs,
    } = calculateTime(
      getTotalTimeInSeconds(paceHours, paceMinutes, paceSeconds),
      distance,
    );
    formik.setValues({
      ...formik.values,
      hours: hrs,
      minutes: mins,
      seconds: secs,
    });
  };
  return (
    <div>
      <p>Time</p>
      <div className="flex items-center">
        <div className="items-center justify-between inline-flex basis-2/3">
          <Input
            placeholder="Hrs"
            name="hours"
            className="flex-shrink flex-grow-0 w-20 h-14"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.hours}
          />
          <Input
            placeholder="Min"
            name="minutes"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.minutes}
            min={0}
            max={59}
            className="flex-shrink flex-grow-0 w-20 h-14"
          />
          <Input
            placeholder="Sec"
            name="seconds"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.seconds}
            min={0}
            max={59}
            step={0.1}
            className="flex-shrink flex-grow-0 w-20 h-14"
          />
        </div>
        <Button size="sm" className="ml-3" onClick={setTime}>
          Calculate
        </Button>
      </div>
    </div>
  );
};
