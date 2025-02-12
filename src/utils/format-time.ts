export const formatTime = (
  hours: number,
  minutes: number,
  seconds: number,
): string => {
  return [hours, minutes, seconds]
    .map((n) => n.toString().padStart(2, "0"))
    .join(":");
};
