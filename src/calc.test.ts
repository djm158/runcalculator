import { calculateDistance, calculatePace, calculateTime, Unit } from "./calc";

it("calculates pace", () => {
  expect(calculatePace(60 * 60, 1, Unit.MILES, Unit.MILES)).toStrictEqual({
    hours: 1,
    minutes: 0,
    seconds: 0.0,
  });
});

it("calculates time", () => {
  expect(calculateTime(6 * 60, 26.2)).toStrictEqual({
    hours: 2,
    minutes: 37,
    seconds: 12.0,
  });
});

it("calculates distance", () => {
  expect(
    calculateDistance(60 * 60, 60 * 8, Unit.MILES, Unit.MILES)
  ).toStrictEqual(7.5);
});
