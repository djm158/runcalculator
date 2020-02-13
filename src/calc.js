export const calculatePace = (seconds, distance) => {
  if (distance === 0) return;
  const secondsPerDistance = seconds / distance;
  const mins = Math.floor(secondsPerDistance / 60);
  return {
    seconds: (secondsPerDistance / 60 - mins) * 60,
    minutes: mins,
    hours: Math.floor(secondsPerDistance / 60 ** 2)
  };
};

export const calculateTime = (seconds, distance) => {
  const time = seconds * distance;
  const decimalHours = time / 60 ** 2;
  const hours = Math.floor(decimalHours);
  const decimalMinutes = (decimalHours - hours) * 60;
  const minutes = Math.floor(decimalMinutes);
  return {
    seconds: (decimalMinutes - minutes) * 60,
    minutes,
    hours
  };
};

export const calculateDistance = (seconds, paceSeconds) => {
  return seconds / paceSeconds;
};
