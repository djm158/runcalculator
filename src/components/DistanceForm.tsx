import { useFormikContext } from "formik";

import { FormState, RaceDistance, Unit } from "../types";
import { getTotalTimeInSeconds, calculateDistance } from "../utils/calc";
import { predefinedRaces, MILES_TO_KILOMETERS } from "../const";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DistanceForm = () => {
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
    const newRaceDistance = predefinedRaces[value];
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
      <div className="flex items-center space-x-3 pb-2">
        <Input
          placeholder="Distance"
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
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Unit.MILES}>Miles</SelectItem>
            <SelectItem value={Unit.KILOMETERS}>Kilometers</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="pink" size="sm" className="ml-3" onClick={setDistance}>
          Calculate
        </Button>
      </div>
      <Select value={raceDistance} onValueChange={handleRaceChange}>
        <SelectTrigger>
          <SelectValue placeholder="Race" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(predefinedRaces).map((race) => (
            <SelectItem key={race} value={race}>
              {race}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
