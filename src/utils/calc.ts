import {
  MILES_TO_KILOMETERS,
  KILOMETERS_TO_MILES,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE,
} from "@/const";
import { Unit } from "@/types";

interface Time {
  seconds: number;
  minutes: number;
  hours: number;
}

export const calculatePace = (
  seconds: number,
  distance: number,
  paceUnit: Unit,
  distanceUnit: Unit,
): Time => {
  if (distance === 0) {
    return getTime(0);
  }

  let adjustedDistance = distance;
  if (paceUnit !== distanceUnit) {
    adjustedDistance =
      paceUnit === Unit.MILES
        ? distance / MILES_TO_KILOMETERS
        : distance / KILOMETERS_TO_MILES;
  }

  return getTime(seconds / adjustedDistance);
};

export const calculateTime = (seconds: number, distance: number): Time => {
  return getTime(seconds * distance);
};

export const calculateDistance = (
  seconds: number,
  paceSeconds: number,
  paceUnit: Unit,
  distanceUnit: Unit,
): number => {
  const conversionFactor =
    paceUnit === distanceUnit
      ? 1
      : paceUnit === Unit.MILES
        ? KILOMETERS_TO_MILES
        : MILES_TO_KILOMETERS;

  return seconds / (paceSeconds * conversionFactor);
};

const getTime = (time: number): Time => {
  const hours = Math.floor(time / SECONDS_PER_HOUR);
  const remainingSeconds = time % SECONDS_PER_HOUR;
  const minutes = Math.floor(remainingSeconds / SECONDS_PER_MINUTE);
  const seconds = Number.parseFloat(
    (remainingSeconds % SECONDS_PER_MINUTE).toFixed(2),
  );

  return {
    seconds,
    minutes,
    hours,
  };
};

export const getTotalTimeInSeconds = (
  hours: string,
  minutes: string,
  seconds: string,
) => {
  const hrs = Number.parseInt(hours) || 0;
  const mins = Number.parseInt(minutes) || 0;
  const secs = Number.parseInt(seconds) || 0;

  return hrs * SECONDS_PER_HOUR + mins * SECONDS_PER_MINUTE + secs;
};
