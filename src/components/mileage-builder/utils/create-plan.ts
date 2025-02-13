import { createWeek } from "./create-week";

import { Day } from "../types";

export const createPlan = ({
  baseMileage,
  increasePercentage,
  runDays,
  recoveryWeekFrequency,
  targetMileage,
  longRunPercentage,
  recoveryWeekPercentage,
  longRunDay,
}: {
  baseMileage: number;
  increasePercentage: number;
  runDays: Day[];
  recoveryWeekFrequency: number;
  targetMileage: number;
  longRunPercentage: number;
  recoveryWeekPercentage: number;
  longRunDay: Day;
}) => {
  const increase = increasePercentage / 100;
  const target = targetMileage;
  const longRunPercent = longRunPercentage / 100;
  const recoveryPercent = recoveryWeekPercentage / 100;

  let currentMileage = baseMileage;
  const newPlan = [];
  let week = 1;

  while (currentMileage < target) {
    const isDownWeek = week % recoveryWeekFrequency === 0;
    const weeklyMileage = isDownWeek
      ? currentMileage * recoveryPercent
      : currentMileage;

    newPlan.push(
      createWeek({
        weekNumber: week,
        weeklyMileage,
        longRunPercent,
        runDays,
        longRunDay,
      }),
    );

    if (!isDownWeek) {
      currentMileage *= 1 + increase;
    }
    week++;

    // Add the final week to the plan if the current mileage is greater than the target
    if (currentMileage >= target) {
      newPlan.push(
        createWeek({
          weekNumber: week,
          weeklyMileage: currentMileage,
          longRunPercent,
          runDays,
          longRunDay,
        }),
      );
    }
  }
  return newPlan;
};
