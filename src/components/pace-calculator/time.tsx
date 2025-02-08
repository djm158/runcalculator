import { useFormikContext } from "formik";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormState } from "@/types";
import { calculateTime, getTotalTimeInSeconds } from "@/utils/calc";

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
      <div className="flex items-center space-x-3 pb-2">
        <Input
          placeholder="Hrs"
          name="hours"
          type="number"
          onChange={handleChange}
          value={values.hours}
        />
        <Input
          placeholder="Min"
          name="minutes"
          type="number"
          onChange={handleChange}
          value={values.minutes}
          min={0}
          max={59}
        />
        <Input
          placeholder="Sec"
          name="seconds"
          type="number"
          onChange={handleChange}
          value={values.seconds}
          min={0}
          max={59}
          step={0.1}
        />
        <Button variant="pink" size="sm" className="ml-3" onClick={setTime}>
          Calculate
        </Button>
      </div>
    </div>
  );
};
