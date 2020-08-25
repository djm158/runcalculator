import { calculateDistance, calculatePace, calculateTime } from "./calc";

it("calculates pace", () => {
  expect(calculatePace(60 * 60, 1)).toStrictEqual({
    hours: 1,
    minutes: 0,
    seconds: 0.00
  });
});

it("calculates time", () => {
  expect(calculateTime(6 * 60, 26.2)).toStrictEqual({
    hours: 2,
    minutes: 37,
    seconds: 12.00
  });
});

it("calculates distance", () => {
  expect(calculateDistance(60 * 60, 60 * 8)).toStrictEqual(7.5);
});
