import { Unit } from "./Calculator";

const MILES_TO_KILOMETERS = 1.60934;

interface Time {
  seconds: number;
  minutes: number;
  hours: number;
}

export const calculatePace = (
  seconds: number,
  distance: number,
  paceUnit: Unit,
  distanceUnit: Unit
): Time => {
  if (distance === 0) {
    return getTimeStruct(0);
  }
  if (paceUnit === distanceUnit) {
    return getTimeStruct(seconds / distance);
  } else if (paceUnit === Unit.MILES && distanceUnit === Unit.KILOMETERS) {
    return getTimeStruct(seconds / (distance * MILES_TO_KILOMETERS));
  } else if (paceUnit === Unit.MILES && distanceUnit === Unit.KILOMETERS) {
    return getTimeStruct((seconds * MILES_TO_KILOMETERS) / distance);
  }
  return getTimeStruct(0);
};

export const calculateTime = (seconds: number, distance: number): Time => {
  return getTimeStruct(seconds * distance);
};

export const calculateDistance = (
  seconds: number,
  paceSeconds: number,
  paceUnit: Unit,
  distanceUnit: Unit
): number => {
  if (paceUnit === distanceUnit) {
    return seconds / paceSeconds;
  } else if (paceUnit === Unit.MILES && distanceUnit === Unit.KILOMETERS) {
    return seconds / (paceSeconds * MILES_TO_KILOMETERS);
  } else if (paceUnit === Unit.KILOMETERS && distanceUnit === Unit.MILES) {
    return (seconds * MILES_TO_KILOMETERS) / paceSeconds;
  }
  return 0;
};

const getTimeStruct = (time: number): Time => {
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
