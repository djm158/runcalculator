import { useFormikContext } from "formik";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RACED_DISTANCES, MILES_TO_KILOMETERS } from "@/const";
import { FormState, RaceDistance, Unit } from "@/types";
import { getTotalTimeInSeconds, calculateDistance } from "@/utils/calc";

import { Placeholders } from "./content";

export const Distance = () => {
  const { setFieldValue, values, handleChange } = useFormikContext<FormState>();
  const {
    raceDistance,
    distance,
    hours,
    minutes,
    seconds,
    paceHours,
    paceMinutes,
    paceSeconds,
    distanceUnit,
    paceUnit,
  } = values;

  const handleRaceChange = (value: RaceDistance) => {
    const newRaceDistance = RACED_DISTANCES[value];
    const distance =
      distanceUnit === Unit.MILES
        ? newRaceDistance / MILES_TO_KILOMETERS
        : newRaceDistance;
    setFieldValue("distance", distance);
    setFieldValue("raceDistance", value);
  };

  const setDistance = () => {
    const totalSeconds = getTotalTimeInSeconds(hours, minutes, seconds);
    const totalPaceSeconds = getTotalTimeInSeconds(
      paceHours,
      paceMinutes,
      paceSeconds,
    );
    const distance =
      totalPaceSeconds > 0
        ? calculateDistance(
            totalSeconds,
            totalPaceSeconds,
            paceUnit,
            distanceUnit,
          )
        : 0;
    setFieldValue("distance", distance);
  };
  return (
    <div>
      <h2 className="text-lg font-semibold">Distance</h2>
      <div className="grid grid-cols-3 md:grid-cols-distance-calculator gap-3">
        <Input
          placeholder={Placeholders.DISTANCE}
          name="distance"
          type="number"
          value={distance}
          onChange={handleChange}
          min={0}
          step={0.1}
        />
        <Select
          value={distanceUnit}
          onValueChange={(value) =>
            handleChange({ target: { name: "distanceUnit", value } })
          }
          name="distanceUnit"
        >
          <SelectTrigger>
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
          onClick={setDistance}
          className="col-span-3 md:col-start-3 md:col-span-1"
        >
          {Placeholders.CALCULATE}
        </Button>
        <Select value={raceDistance} onValueChange={handleRaceChange}>
          <SelectTrigger className="md:col-span-1 row-start-1 md:row-start-2">
            <SelectValue placeholder={Placeholders.RACE} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(RACED_DISTANCES).map((race) => (
              <SelectItem key={race} value={race}>
                {race}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
