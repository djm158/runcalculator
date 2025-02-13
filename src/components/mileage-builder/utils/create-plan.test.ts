import { createPlan } from "./create-plan";

import { DAY_ITEMS } from "../const";
import { Day } from "../types";

describe("createPlan", () => {
  const defaultParams = {
    baseMileage: 20,
    increasePercentage: 10,
    runDays: ["Monday", "Wednesday", "Friday", "Sunday"] as Day[],
    recoveryWeekFrequency: 4,
    targetMileage: 30,
    longRunPercentage: 30,
    recoveryWeekPercentage: 80,
    longRunDay: "Sunday" as Day,
  };

  it("creates a plan with correct weekly progression", () => {
    const plan = createPlan(defaultParams);

    // Week 1: 20 miles
    expect(plan[0].week).toBe(1);
    expect(plan[0].totalMileage).toBe(20);

    // Week 2: 22 miles (10% increase)
    expect(plan[1].week).toBe(2);
    expect(plan[1].totalMileage).toBeCloseTo(22);

    // Week 3: 24.2 miles
    expect(plan[2].week).toBe(3);
    expect(plan[2].totalMileage).toBeCloseTo(24.2);
  });

  it("includes recovery weeks at specified frequency", () => {
    const plan = createPlan(defaultParams);

    // Week 4 should be recovery week (80% of current mileage)
    const week4 = plan[3];
    expect(week4.week).toBe(4);
    // Previous week was 24.2, so recovery week should be ~19.36
    expect(week4.totalMileage).toBeCloseTo(21.3);
  });

  it("distributes mileage correctly between long run and other days", () => {
    const plan = createPlan(defaultParams);
    const firstWeek = plan[0];

    // For 20 miles total with 30% long run:
    // Long run should be 6 miles
    // Other 3 runs should be ~4.67 miles each
    const sundayIndex = DAY_ITEMS.findIndex((day) => day.value === "Sunday");
    const longRun = firstWeek.runs[sundayIndex];
    expect(longRun).toBeCloseTo(6);

    // Check other run days have correct mileage
    const mondayIndex = DAY_ITEMS.findIndex((day) => day.value === "Monday");
    const wednesdayIndex = DAY_ITEMS.findIndex(
      (day) => day.value === "Wednesday",
    );
    const fridayIndex = DAY_ITEMS.findIndex((day) => day.value === "Friday");

    expect(firstWeek.runs[mondayIndex]).toBeCloseTo(4.67, 1);
    expect(firstWeek.runs[wednesdayIndex]).toBeCloseTo(4.67, 1);
    expect(firstWeek.runs[fridayIndex]).toBeCloseTo(4.67, 1);
  });

  it("stops when target mileage is reached", () => {
    const plan = createPlan({
      ...defaultParams,
      baseMileage: 25,
      targetMileage: 30,
      increasePercentage: 20,
    });

    // Should reach target in 2 weeks
    // Week 1: 25
    // Week 2: 30
    expect(plan.length).toBe(2);
    expect(plan[plan.length - 1].totalMileage).toBeGreaterThanOrEqual(30);
  });

  it("handles single run day correctly", () => {
    const plan = createPlan({
      ...defaultParams,
      runDays: ["Sunday"] as Day[],
      baseMileage: 10,
      targetMileage: 15,
    });

    const firstWeek = plan[0];
    // With only one run day, all mileage should be on Sunday
    const sundayIndex = DAY_ITEMS.findIndex((day) => day.value === "Sunday");
    expect(firstWeek.runs[sundayIndex]).toBe(10);
    // Other days should be 0
    expect(firstWeek.runs.filter((miles) => miles > 0).length).toBe(1);
  });
});
