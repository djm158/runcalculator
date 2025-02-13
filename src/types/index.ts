import { RACED_DISTANCES } from "../const";

export enum Unit {
  MILES = "Miles",
  KILOMETERS = "Kilometers",
}

export const DistanceUnit = {
  MILES: "Miles",
  KILOMETERS: "Kilometers",
} as const;

export type DistanceUnit = (typeof DistanceUnit)[keyof typeof DistanceUnit];

export interface FormState {
  distanceUnit: Unit;
  distance: string;
  hours: string;
  minutes: string;
  seconds: string;
  paceHours: string;
  paceMinutes: string;
  paceSeconds: string;
  paceUnit: Unit;
  raceDistance: RaceDistance | "";
}

export type RaceDistance = keyof typeof RACED_DISTANCES;
