"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RACED_DISTANCES, MILES_TO_KILOMETERS } from "@/const";
import { RaceDistance } from "@/types";
import { calculateSplitTimes } from "@/utils/calculate-split-times";

import { SplitsTable } from "./splits-table";

export const RaceSplitsGenerator = () => {
  const [distance, setDistance] = useState("");
  const [paceMinutes, setPaceMinutes] = useState("");
  const [paceSeconds, setPaceSeconds] = useState("");
  const [unit, setUnit] = useState<"miles" | "kilometers">("miles");
  const [splits, setSplits] = useState<{ distance: number; time: string }[]>(
    [],
  );
  const [raceDistance, setRaceDistance] = useState<RaceDistance | "">("");

  const generateSplits = () => {
    const distanceValue = Number.parseFloat(distance);
    const minutes = Number.parseInt(paceMinutes) || 0;
    const seconds = Number.parseInt(paceSeconds) || 0;
    const paceInSeconds = minutes * 60 + seconds;

    if (distanceValue && paceInSeconds) {
      const newSplits = calculateSplitTimes(distanceValue, paceInSeconds);

      setSplits(newSplits);
    }
  };

  const handleRaceChange = (value: RaceDistance): void => {
    const raceDistance = RACED_DISTANCES[value];
    const distance =
      raceDistance / (unit === "miles" ? MILES_TO_KILOMETERS : 1);
    setDistance(distance.toFixed(2));
    setRaceDistance(value);
  };

  const handleUnitChange = (value: "miles" | "kilometers"): void => {
    setUnit(value);
    const distanceValue = Number.parseFloat(distance);
    const newDistance =
      value === "miles"
        ? distanceValue / MILES_TO_KILOMETERS
        : distanceValue * MILES_TO_KILOMETERS;
    setDistance(newDistance.toFixed(2));
  };

  return (
    <Card className="bg-white/30 dark:bg-black/30 backdrop-blur-lg border-purple-200 dark:border-purple-800">
      <CardHeader className="border-b border-purple-200 dark:border-purple-800">
        <CardTitle className="text-purple-600 dark:text-purple-300">
          Race Splits Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="race-distance">Distance</Label>
              <Input
                id="race-distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value as RaceDistance)}
                placeholder="Enter distance"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="race-unit">Unit</Label>
              <Select value={unit} onValueChange={handleUnitChange}>
                <SelectTrigger id="race-unit" ariaLabel="Unit Menu">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="miles">Miles</SelectItem>
                  <SelectItem value="kilometers">Kilometers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={raceDistance} onValueChange={handleRaceChange}>
                <SelectTrigger ariaLabel="Race Distance Menu">
                  <SelectValue placeholder="Race" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(RACED_DISTANCES).map((race) => (
                    <SelectItem key={race} value={race}>
                      {race}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pace-minutes">Pace Minutes</Label>
              <Input
                id="pace-minutes"
                value={paceMinutes}
                onChange={(e) => setPaceMinutes(e.target.value)}
                placeholder="MM"
                type="number"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="pace-seconds">Pace Seconds</Label>
              <Input
                id="pace-seconds"
                value={paceSeconds}
                onChange={(e) => setPaceSeconds(e.target.value)}
                placeholder="SS"
                type="number"
                min="0"
                max="59"
              />
            </div>
          </div>
          <Button
            onClick={generateSplits}
            className="bg-purple-500 hover:bg-purple-600 text-white"
            disabled={!distance || (!paceMinutes && !paceSeconds)}
          >
            Generate Splits
          </Button>
          {splits.length > 0 && <SplitsTable splits={splits} unit={unit} />}
        </div>
      </CardContent>
    </Card>
  );
};
