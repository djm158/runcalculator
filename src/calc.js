export const calculatePace = (seconds, distance) => {
  if (distance === 0) return;
  return getTimeStruct(seconds / distance);
};

export const calculateTime = (seconds, distance) => {
  return getTimeStruct(seconds * distance);
};

export const calculateDistance = (seconds, paceSeconds) => {
  return seconds / paceSeconds;
};

const getTimeStruct = time => {
  const decimalHours = time / 60 ** 2;
  const hours = Math.floor(decimalHours);
  const decimalMinutes = (decimalHours - hours) * 60;
  const minutes = Math.floor(decimalMinutes);
  return {
    seconds: Math.round((decimalMinutes - minutes) * 60),
    minutes,
    hours
  };
};
