import { getTotalTimeInSeconds, calculateTime, calculatePace } from "./calc";

import { Unit } from "../types";

export const generateSplits = ({
  hours,
  minutes,
  seconds,
  distance,
  distanceUnit,
}: {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
  distance: number | string;
  distanceUnit: Unit;
}) => {
  const totalSeconds = getTotalTimeInSeconds(hours, minutes, seconds);
  const {
    hours: paceHours,
    minutes: paceMinutes,
    seconds: paceSeconds,
  } = calculatePace(
    totalSeconds,
    distance as number,
    distanceUnit, // Force distance units to avoid genearting a split with a different unit than the distance (e.g. if pace is)
    distanceUnit,
  );
  const splits = [];
  const d = typeof distance === "string" ? 0 : distance;
  const totalPaceSeconds = getTotalTimeInSeconds(
    paceHours,
    paceMinutes,
    paceSeconds,
  );
  for (let i = 1; i <= d; i++) {
    const splitTime = calculateTime(totalPaceSeconds, i);
    splits.push({
      split: i,
      hours: splitTime.hours,
      minutes: splitTime.minutes,
      seconds: splitTime.seconds,
    });
  }
  return splits;
};
