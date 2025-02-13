import { Day } from "./types";

type WeekdayOption = {
  label: string;
  value: Day;
};

const Days = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
} as const;

export const Weekdays = Object.values(Days);

export const WEEKDAY_OPTIONS: WeekdayOption[] = [
  {
    label: Days.MONDAY,
    value: Days.MONDAY,
  },
  {
    label: Days.TUESDAY,
    value: Days.TUESDAY,
  },
  {
    label: Days.WEDNESDAY,
    value: Days.WEDNESDAY,
  },
  {
    label: Days.THURSDAY,
    value: Days.THURSDAY,
  },
  {
    label: Days.FRIDAY,
    value: Days.FRIDAY,
  },
  {
    label: Days.SATURDAY,
    value: Days.SATURDAY,
  },
  {
    label: Days.SUNDAY,
    value: Days.SUNDAY,
  },
];

export const DEFAULT_INCREASE_PERCENTAGE = "10";
export const DEFAULT_RECOVERY_WEEK_PERCENTAGE = "80";
export const DEFAULT_RECOVERY_WEEK_FREQUENCY = "3";
export const DEFAULT_LONG_RUN_PERCENTAGE = "30";

export const WEEKDAY_INDICES = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,
} as const;
