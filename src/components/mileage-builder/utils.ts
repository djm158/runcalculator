export const formatMileage = (mileage: number, roundDecimals: boolean) => {
  if (mileage === 0) {
    return "Rest";
  }
  if (roundDecimals) {
    return Math.round(mileage);
  }
  return mileage.toFixed(2);
};
