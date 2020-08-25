const MILES_TO_KILOMETERS = 1.60934;

export const calculatePace = (seconds, distance, paceUnit, distanceUnit) => {
  if (distance === 0) {
    return getTimeStruct(0);
  }
  if (paceUnit === distanceUnit) {
    return getTimeStruct(seconds / distance);
  } else if (paceUnit === "Miles" && distanceUnit === "Kilometers") {
    return getTimeStruct(seconds / (distance * MILES_TO_KILOMETERS));
  } else if (paceUnit === "Miles" && distanceUnit === "Kilometers") {
    return getTimeStruct((seconds * MILES_TO_KILOMETERS) / distance);
  }
  return getTimeStruct(0);
};

export const calculateTime = (seconds, distance, unit) => {
  return getTimeStruct(seconds * distance);
};

export const calculateDistance = (
  seconds,
  paceSeconds,
  paceUnit,
  distanceUnit
) => {
  if (paceUnit === distanceUnit) {
    return seconds / paceSeconds;
  } else if (paceUnit === "Miles" && distanceUnit === "Kilometers") {
    return seconds / (paceSeconds * MILES_TO_KILOMETERS);
  } else if (paceUnit === "Kilometers" && distanceUnit === "Miles") {
    return (seconds * MILES_TO_KILOMETERS) / paceSeconds;
  }
};

const getTimeStruct = (time) => {
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
