import { Weekdays } from "../const";
import { Day } from "../types";

export const formatMileage = (mileage: number, roundDecimals: boolean) => {
  if (mileage === 0) {
    return "Rest";
  }
  if (roundDecimals) {
    return Math.round(mileage);
  }
  return mileage.toFixed(2);
};

export const createWeek = ({
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
  let longRunMileage = weeklyMileage * longRunPercent;
  let otherRunsMileage = 0;
  if (runDays.length > 1) {
    otherRunsMileage = (weeklyMileage - longRunMileage) / (runDays.length - 1);
  } else {
    longRunMileage = weeklyMileage;
    otherRunsMileage = 0;
  }

  return {
    week: weekNumber,
    totalMileage: weeklyMileage,
    runs: Array(Weekdays.length)
      .fill(0)
      .map((_, index) => {
        const day = Weekdays[index];
        if (!runDays.includes(day)) return 0;
        return day === longRunDay ? longRunMileage : otherRunsMileage;
      }),
  };
};
