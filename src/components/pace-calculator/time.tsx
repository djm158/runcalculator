import { useFormikContext } from "formik";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormState } from "@/types";
import { calculateTime, getTotalTimeInSeconds } from "@/utils/calc";

import { Placeholders } from "./content";

export const Time = () => {
  const { values, handleChange, setValues } = useFormikContext<FormState>();

  const setTime = () => {
    const distance = Number.parseFloat(values.distance) || 0;
    if (distance === 0) return;

    const totalPaceSeconds = getTotalTimeInSeconds(
      values.paceHours,
      values.paceMinutes,
      values.paceSeconds,
    );

    const { seconds, minutes, hours } = calculateTime(
      totalPaceSeconds,
      distance,
      values.paceUnit,
      values.distanceUnit,
    );

    setValues({
      ...values,
      hours: hours.toString(),
      minutes: minutes.toString(),
      seconds: seconds.toString(),
    });
  };
  return (
    <div>
      <h2 className="text-lg font-semibold">Time</h2>
      <div className="grid grid-rows-2 grid-cols-3 md:grid-cols-pace-calculator md:grid-rows-1 gap-3">
        <Input
          placeholder={Placeholders.HOURS}
          name="hours"
          type="number"
          onChange={handleChange}
          value={values.hours}
        />
        <Input
          placeholder={Placeholders.MINUTES}
          name="minutes"
          type="number"
          onChange={handleChange}
          value={values.minutes}
          min={0}
          max={59}
        />
        <Input
          placeholder={Placeholders.SECONDS}
          name="seconds"
          type="number"
          onChange={handleChange}
          value={values.seconds}
          min={0}
          max={59}
          step={0.1}
        />
        <Button
          variant="pink"
          size="sm"
          className="col-span-3 md:col-span-1 md:col-start-4"
          onClick={setTime}
        >
          {Placeholders.CALCULATE}
        </Button>
      </div>
    </div>
  );
};
