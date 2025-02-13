import { DAY_ITEMS } from "./const";
import { generateWeekPlan } from "./utils";

describe("generateWeekPlan", () => {
  it("generates a week plan with correct total mileage", () => {
    const result = generateWeekPlan({
      weekNumber: 1,
      weeklyMileage: 30,
      longRunPercent: 0.3,
      runDays: ["Monday", "Wednesday", "Friday", "Sunday"],
      longRunDay: "Sunday",
    });

    expect(result.totalMileage).toBe(30);
  });

  it("calculates long run mileage correctly", () => {
    const result = generateWeekPlan({
      weekNumber: 1,
      weeklyMileage: 40,
      longRunPercent: 0.4, // 40% of total mileage
      runDays: ["Tuesday", "Thursday", "Saturday", "Sunday"],
      longRunDay: "Sunday",
    });

    const sundayIndex = DAY_ITEMS.findIndex((item) => item.value === "Sunday");
    expect(result.runs[sundayIndex]).toBe(16); // 40 * 0.4 = 16 miles
  });

  it("distributes remaining mileage evenly across other run days", () => {
    const result = generateWeekPlan({
      weekNumber: 1,
      weeklyMileage: 30,
      longRunPercent: 0.3, // 9 miles for long run
      runDays: ["Monday", "Wednesday", "Friday", "Sunday"],
      longRunDay: "Sunday",
    });

    const mondayIndex = DAY_ITEMS.findIndex((item) => item.value === "Monday");
    const wednesdayIndex = DAY_ITEMS.findIndex(
      (item) => item.value === "Wednesday",
    );
    const fridayIndex = DAY_ITEMS.findIndex((item) => item.value === "Friday");

    // Remaining 21 miles split between 3 days = 7 miles each
    expect(result.runs[mondayIndex]).toBe(7);
    expect(result.runs[wednesdayIndex]).toBe(7);
    expect(result.runs[fridayIndex]).toBe(7);
  });

  it("sets non-run days to 0 mileage", () => {
    const result = generateWeekPlan({
      weekNumber: 1,
      weeklyMileage: 20,
      longRunPercent: 0.5,
      runDays: ["Wednesday", "Sunday"],
      longRunDay: "Sunday",
    });

    const tuesdayIndex = DAY_ITEMS.findIndex(
      (item) => item.value === "Tuesday",
    );
    const thursdayIndex = DAY_ITEMS.findIndex(
      (item) => item.value === "Thursday",
    );
    const saturdayIndex = DAY_ITEMS.findIndex(
      (item) => item.value === "Saturday",
    );

    expect(result.runs[tuesdayIndex]).toBe(0);
    expect(result.runs[thursdayIndex]).toBe(0);
    expect(result.runs[saturdayIndex]).toBe(0);
  });
});
