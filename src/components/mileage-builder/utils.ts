import { DAY_ITEMS } from "./const";
import { Day } from "./types";

export const formatMileage = (mileage: number, roundDecimals: boolean) => {
  if (mileage === 0) {
    return "Rest";
  }
  if (roundDecimals) {
    return Math.round(mileage);
  }
  return mileage.toFixed(2);
};

export const generateWeekPlan = ({
  weekNumber,
  weeklyMileage,
  longRunPercent,
  runDays,
  longRunDay,
}: {
  weekNumber: number;
  weeklyMileage: number;
  longRunPercent: number;
  runDays: Day[];
  longRunDay: Day;
}) => {
  const longRunMileage = weeklyMileage * longRunPercent;
  const otherRunsMileage =
    (weeklyMileage - longRunMileage) / (runDays.length - 1);

  return {
    week: weekNumber,
    totalMileage: weeklyMileage,
    runs: Array(DAY_ITEMS.length)
      .fill(0)
      .map((_, index) => {
        const day = DAY_ITEMS[index].value;
        if (!runDays.includes(day)) return 0;
        return day === longRunDay ? longRunMileage : otherRunsMileage;
      }),
  };
};
