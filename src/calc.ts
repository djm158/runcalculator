export const MILES_TO_KILOMETERS = 1.60934;

export enum Unit {
  MILES = "Miles",
  KILOMETERS = "Kilometers",
}

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
    return getTime(0);
  }
  if (paceUnit === distanceUnit) {
    return getTime(seconds / distance);
  } else if (paceUnit === Unit.MILES && distanceUnit === Unit.KILOMETERS) {
    return getTime(seconds / (distance * MILES_TO_KILOMETERS));
  } else if (paceUnit === Unit.MILES && distanceUnit === Unit.KILOMETERS) {
    return getTime((seconds * MILES_TO_KILOMETERS) / distance);
  }
  return getTime(0);
};

export const calculateTime = (seconds: number, distance: number): Time => {
  return getTime(seconds * distance);
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
    return seconds / (paceSeconds * MILES_TO_KILOMETERS);

    // return (seconds * MILES_TO_KILOMETERS) / paceSeconds;
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
