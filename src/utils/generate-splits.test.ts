import { generateSplits } from "./generate-splits";
import { Unit } from "../types";

describe("generateSplits", () => {
  it("generates splits correctly for a given time and distance", () => {
    const splits = generateSplits({
      hours: 1,
      minutes: 0,
      seconds: 0,
      distance: 5,
      distanceUnit: Unit.MILES,
    });

    expect(splits).toStrictEqual([
      { split: 1, hours: 0, minutes: 12, seconds: 0 },
      { split: 2, hours: 0, minutes: 24, seconds: 0 },
      { split: 3, hours: 0, minutes: 36, seconds: 0 },
      { split: 4, hours: 0, minutes: 48, seconds: 0 },
      { split: 5, hours: 1, minutes: 0, seconds: 0 },
    ]);
  });

  it("returns an empty array if distance is zero", () => {
    const splits = generateSplits({
      hours: 1,
      minutes: 0,
      seconds: 0,
      distance: 0,
      distanceUnit: Unit.MILES,
    });

    expect(splits).toStrictEqual([]);
  });
});
