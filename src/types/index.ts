import { predefinedRaces } from "../const";

export enum Unit {
  MILES = "Miles",
  KILOMETERS = "Kilometers",
}

export interface FormState {
  distanceUnit: Unit;
  distance: number | string;
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
  paceHours: number | string;
  paceMinutes: number | string;
  paceSeconds: number | string;
  paceUnit: Unit;
  raceDistance: RaceDistance | "";
}

export type RaceDistance = keyof typeof predefinedRaces;
