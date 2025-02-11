import { useFormikContext } from "formik";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Unit, FormState } from "@/types";
import { getTotalTimeInSeconds, calculatePace } from "@/utils/calc";

export const Pace = () => {
  const { values, handleChange, setValues } = useFormikContext<FormState>();

  const setPace = () => {
    const distance = Number.parseFloat(values.distance) || 0;
    if (distance === 0) return;

    const totalSeconds = getTotalTimeInSeconds(
      values.hours,
      values.minutes,
      values.seconds,
    );

    const { seconds, minutes, hours } = calculatePace(
      totalSeconds,
      distance,
      values.paceUnit,
      values.distanceUnit,
    );

    setValues({
      ...values,
      paceHours: hours.toString(),
      paceMinutes: minutes.toString(),
      paceSeconds: seconds.toString(),
    });
  };
  return (
    <div>
      <h2 className="text-lg font-semibold">Pace</h2>
      <div className="grid grid-cols-3 md:grid-cols-pace-calculator grid-rows-2 gap-3 pb-2">
        <Input
          placeholder="HH"
          name="paceHours"
          type="number"
          value={values.paceHours}
          onChange={handleChange}
          min={0}
        />
        <Input
          placeholder="MM"
          name="paceMinutes"
          type="number"
          value={values.paceMinutes}
          onChange={handleChange}
          min={0}
          max={59}
        />
        <Input
          placeholder="SS"
          name="paceSeconds"
          type="number"
          value={values.paceSeconds}
          onChange={handleChange}
          min={0}
          max={59}
        />
        <Select
          value={values.paceUnit}
          onValueChange={(value) =>
            handleChange({ target: { name: "paceUnit", value } })
          }
          name="paceUnit"
        >
          <SelectTrigger className="col-span-2 md:col-span-1 md:row-start-2">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Unit.MILES}>Miles</SelectItem>
            <SelectItem value={Unit.KILOMETERS}>Kilometers</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="pink"
          size="sm"
          onClick={setPace}
          className="md:col-start-4"
        >
          Calculate
        </Button>
      </div>
    </div>
  );
};
