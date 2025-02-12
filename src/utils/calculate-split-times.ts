import { SECONDS_PER_HOUR } from "@/const";

import { formatTime } from "./format-time";

export const calculateSplitTimes = (
  distance: number,
  paceInSeconds: number,
) => {
  const splitCount = Math.floor(distance);
  const newSplits = [];

  for (let i = 1; i <= splitCount; i++) {
    const totalSeconds = i * paceInSeconds;
    const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
    const minutes = Math.floor((totalSeconds % SECONDS_PER_HOUR) / 60);
    const seconds = Math.round(totalSeconds % 60);
    newSplits.push({
      distance: i,
      time: formatTime(hours, minutes, seconds),
    });
  }

  // Add the final split if there's a fractional distance
  if (distance > splitCount) {
    const totalSeconds = distance * paceInSeconds;
    const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
    const minutes = Math.floor((totalSeconds % SECONDS_PER_HOUR) / 60);
    const seconds = Math.round(totalSeconds % 60);
    newSplits.push({
      distance,
      time: formatTime(hours, minutes, seconds),
    });
  }

  return newSplits;
};
