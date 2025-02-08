export const MILES_TO_KILOMETERS = 1.60934;
export const KILOMETERS_TO_MILES = 1 / MILES_TO_KILOMETERS;

export const SECONDS_PER_HOUR = 3600;

export const RACED_DISTANCES = {
  "5k": 5,
  "8k": 8,
  "10k": 10,
  "10 mile": 10 * MILES_TO_KILOMETERS,
  "Half Marathon": 21.0975,
  Marathon: 42.195,
  "50k": 50,
  "100k": 100,
} as const;
