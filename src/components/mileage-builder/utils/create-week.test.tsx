import { createWeek } from "./create-week";

import { WEEKDAY_INDICES } from "../day";

describe("generateWeekPlan", () => {
  it("generates a week plan with correct total mileage", () => {
    const result = createWeek({
      weekNumber: 1,
      weeklyMileage: 30,
      longRunPercent: 0.3,
      runDays: ["Monday", "Wednesday", "Friday", "Sunday"],
      longRunDay: "Sunday",
    });

    expect(result.totalMileage).toBe(30);
  });

  it("calculates long run mileage correctly", () => {
    const result = createWeek({
      weekNumber: 1,
      weeklyMileage: 40,
      longRunPercent: 0.4, // 40% of total mileage
      runDays: ["Tuesday", "Thursday", "Saturday", "Sunday"],
      longRunDay: "Sunday",
    });

    expect(result.runs[WEEKDAY_INDICES.SUNDAY]).toBe(16); // 40 * 0.4 = 16 miles
  });

  it("distributes remaining mileage evenly across other run days", () => {
    const result = createWeek({
      weekNumber: 1,
      weeklyMileage: 30,
      longRunPercent: 0.3, // 9 miles for long run
      runDays: ["Monday", "Wednesday", "Friday", "Sunday"],
      longRunDay: "Sunday",
    });

    expect(result.runs[WEEKDAY_INDICES.MONDAY]).toBe(7);
    expect(result.runs[WEEKDAY_INDICES.WEDNESDAY]).toBe(7);
    expect(result.runs[WEEKDAY_INDICES.FRIDAY]).toBe(7);

    // Remaining 21 miles split between 3 days = 7 miles each
    expect(result.runs[WEEKDAY_INDICES.MONDAY]).toBe(7);
    expect(result.runs[WEEKDAY_INDICES.WEDNESDAY]).toBe(7);
    expect(result.runs[WEEKDAY_INDICES.FRIDAY]).toBe(7);
  });

  it("sets non-run days to 0 mileage", () => {
    const result = createWeek({
      weekNumber: 1,
      weeklyMileage: 20,
      longRunPercent: 0.5,
      runDays: ["Wednesday", "Sunday"],
      longRunDay: "Sunday",
    });

    expect(result.runs[WEEKDAY_INDICES.TUESDAY]).toBe(0);
    expect(result.runs[WEEKDAY_INDICES.THURSDAY]).toBe(0);
    expect(result.runs[WEEKDAY_INDICES.SATURDAY]).toBe(0);
  });
});
