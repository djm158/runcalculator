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

import { Placeholders } from "./content";

export const Pace = () => {
  const { values, handleChange, setFieldValue } = useFormikContext<FormState>();

  const updatePaceFields = (
    hours: number,
    minutes: number,
    seconds: number,
  ) => {
    setFieldValue("paceHours", hours.toString());
    setFieldValue("paceMinutes", minutes.toString());
    setFieldValue("paceSeconds", seconds.toString());
  };

  const calculatePaceValues = (
    totalSeconds: number,
    distance: number,
    paceUnit: Unit,
    distanceUnit: Unit,
  ) => {
    if (distance === 0) return { hours: 0, minutes: 0, seconds: 0 };
    return calculatePace(totalSeconds, distance, paceUnit, distanceUnit);
  };

  const setPace = () => {
    const distance = Number.parseFloat(values.distance) || 0;

    const totalSeconds = getTotalTimeInSeconds(
      values.hours,
      values.minutes,
      values.seconds,
    );

    const paceValues = calculatePaceValues(
      totalSeconds,
      distance,
      values.paceUnit,
      values.distanceUnit,
    );

    if (paceValues) {
      updatePaceFields(
        paceValues.hours,
        paceValues.minutes,
        paceValues.seconds,
      );
    }
  };

  const handlePaceUnitChange = (value: string) => {
    setFieldValue("paceUnit", value);

    const distance = Number.parseFloat(values.distance);
    if (distance === 0) return;

    const totalSeconds = getTotalTimeInSeconds(
      values.hours,
      values.minutes,
      values.seconds,
    );

    const paceValues = calculatePaceValues(
      totalSeconds,
      distance,
      value as Unit,
      values.distanceUnit,
    );

    if (paceValues) {
      updatePaceFields(
        paceValues.hours,
        paceValues.minutes,
        paceValues.seconds,
      );
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Pace</h2>
      <div className="grid grid-cols-3 md:grid-cols-pace-calculator grid-rows-2 gap-3">
        <Input
          placeholder={Placeholders.HOURS}
          name="paceHours"
          type="number"
          value={values.paceHours}
          onChange={handleChange}
          min={0}
        />
        <Input
          placeholder={Placeholders.MINUTES}
          name="paceMinutes"
          type="number"
          value={values.paceMinutes}
          onChange={handleChange}
          min={0}
          max={59}
        />
        <Input
          placeholder={Placeholders.SECONDS}
          name="paceSeconds"
          type="number"
          value={values.paceSeconds}
          onChange={handleChange}
          min={0}
          max={59}
        />
        <Select
          value={values.paceUnit}
          onValueChange={handlePaceUnitChange}
          name="paceUnit"
        >
          <SelectTrigger
            className="col-span-1 md:row-start-2"
            ariaLabel="Pace Unit Menu"
          >
            <SelectValue placeholder={Placeholders.UNIT} />
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
          className="row-start-2 col-start-2 col-span-2 md:row-start-1 md:col-start-4 md:col-span-1"
        >
          {Placeholders.CALCULATE}
        </Button>
      </div>
    </div>
  );
};
