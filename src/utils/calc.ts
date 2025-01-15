import { Unit } from "../types";

import { MILES_TO_KILOMETERS, KILOMETERS_TO_MILES } from "../const";

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
  if (paceUnit === Unit.MILES && distanceUnit === Unit.KILOMETERS) {
    return getTime(seconds / (distance / MILES_TO_KILOMETERS));
  } else if (paceUnit === Unit.KILOMETERS && distanceUnit === Unit.MILES) {
    return getTime(seconds / (distance / KILOMETERS_TO_MILES));
  }
  return getTime(seconds / distance);
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
  if (paceUnit === distanceUnit) {
    return seconds / paceSeconds;
  } else if (paceUnit === Unit.MILES && distanceUnit === Unit.KILOMETERS) {
    return seconds / (paceSeconds * KILOMETERS_TO_MILES);
  } else if (paceUnit === Unit.KILOMETERS && distanceUnit === Unit.MILES) {
    return seconds / (paceSeconds * MILES_TO_KILOMETERS);
  }
  return 0;
};

const getTime = (time: number): Time => {
  const decimalHours = time / 60 ** 2;
  const hours = Math.floor(decimalHours);
  const decimalMinutes = (decimalHours - hours) * 60;
  const minutes = Math.floor(decimalMinutes);
  return {
    seconds: Number.parseFloat(((decimalMinutes - minutes) * 60).toFixed(2)),
    minutes,
    hours,
  };
};

export const getTotalTimeInSeconds = (
  hours: number | string,
  minutes: number | string,
  seconds: number | string,
) => {
  const hrs = typeof hours === "string" ? 0 : hours;
  const mins = typeof minutes === "string" ? 0 : minutes;
  const secs = typeof seconds === "string" ? 0 : seconds;
  const total = hrs * 60 * 60 + mins * 60 + secs;
  return total;
};
