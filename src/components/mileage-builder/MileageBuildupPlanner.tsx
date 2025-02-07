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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Checkbox } from "../ui/checkbox";

const daysOfWeekItems = [
  {
    label: "Monday",
    value: "Monday",
  },
  {
    label: "Tuesday",
    value: "Tuesday",
  },
  {
    label: "Wednesday",
    value: "Wednesday",
  },
  {
    label: "Thursday",
    value: "Thursday",
  },
  {
    label: "Friday",
    value: "Friday",
  },
  {
    label: "Saturday",
    value: "Saturday",
  },
  {
    label: "Sunday",
    value: "Sunday",
  },
];

export const MileageBuildupPlanner = () => {
  const [baseMileage, setBaseMileage] = useState("");
  const [increasePercentage, setIncreasePercentage] = useState("");
  const [recoveryWeekFrequency, setRecoveryWeekFrequency] = useState("");
  const [targetMileage, setTargetMileage] = useState("");
  const [longRunPercentage, setLongRunPercentage] = useState("");
  const [longRunDay, setLongRunDay] = useState("Sunday");
  const [plan, setPlan] = useState<
    {
      week: number;
      totalMileage: number;
      runs: number[];
    }[]
  >([]);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const generatePlan = () => {
    const base = Number.parseFloat(baseMileage);
    const increase = Number.parseFloat(increasePercentage) / 100;
    // const runs = Number.parseInt(runsPerWeek);
    const runs = daysOfWeek.length;
    console.log(runs);
    console.log(daysOfWeek);
    const downWeeks = Number.parseInt(recoveryWeekFrequency);
    const target = Number.parseFloat(targetMileage);
    const longRunPercent = Number.parseFloat(longRunPercentage) / 100;

    if (base && increase && runs && downWeeks && target && longRunPercent) {
      let currentMileage = base;
      const newPlan = [];
      let week = 1;

      while (currentMileage < target) {
        const isDownWeek = week % downWeeks === 0;
        const weeklyMileage = isDownWeek
          ? currentMileage * 0.8
          : currentMileage;
        const longRunMileage = weeklyMileage * longRunPercent;
        const otherRunsMileage = (weeklyMileage - longRunMileage) / (runs - 1);

        const weekPlan = {
          week,
          totalMileage: weeklyMileage,
          runs: Array(runs).fill(otherRunsMileage),
        };
        weekPlan.runs[weekPlan.runs.length - 1] = longRunMileage;

        newPlan.push(weekPlan);

        if (!isDownWeek) {
          currentMileage *= 1 + increase;
        }
        week++;

        // Add the final week to the plan if the current mileage is greater than the target
        if (currentMileage > target) {
          newPlan.push({
            week: week + 1,
            totalMileage: currentMileage,
            runs: Array(runs).fill(currentMileage / runs),
          });
        }
      }
      console.log(newPlan);

      setPlan(newPlan);
    }
  };

  return (
    <Card className="bg-white/30 dark:bg-black/30 backdrop-blur-lg border-blue-200 dark:border-blue-800">
      <CardHeader className="border-b border-blue-200 dark:border-blue-800">
        <CardTitle className="text-blue-600 dark:text-blue-300">
          Mileage Buildup Planner
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-4">
          <div>
            <Label className="text-lg mb-2">
              Which days of the week do you run?
            </Label>
            <div className="grid grid-cols-5 gap-4 py-2">
              {daysOfWeekItems.map((item) => (
                <div
                  className="flex items-center gap-2 justify-evenly"
                  key={item.value}
                >
                  <Label htmlFor={item.value}>{item.label}</Label>
                  <Checkbox
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-blue-500 h-6 w-6"
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setDaysOfWeek([...daysOfWeek, item.value]);
                      } else {
                        setDaysOfWeek(
                          daysOfWeek.filter((day) => day !== item.value),
                        );
                      }
                    }}
                    id={item.value}
                    value={item.value}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="base-mileage">Base Weekly Mileage</Label>
              <Input
                id="base-mileage"
                value={baseMileage}
                onChange={(e) => setBaseMileage(e.target.value)}
                placeholder="Enter base mileage"
              />
            </div>
            <div>
              <Label htmlFor="increase-percentage">Increase Percentage</Label>
              <Input
                id="increase-percentage"
                value={increasePercentage}
                onChange={(e) => setIncreasePercentage(e.target.value)}
                placeholder="Enter increase %"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="long-run-percentage">Long Run Percentage</Label>
              <Input
                id="long-run-percentage"
                value={longRunPercentage}
                onChange={(e) => setLongRunPercentage(e.target.value)}
                placeholder="Enter long run %"
              />
            </div>

            <div>
              <Label htmlFor="recovery-week-frequency">
                Recovery Week Frequency
              </Label>
              <Input
                id="recovery-week-frequency"
                value={recoveryWeekFrequency}
                onChange={(e) => setRecoveryWeekFrequency(e.target.value)}
                placeholder="Enter recovery week frequency"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target-mileage">Target Weekly Mileage</Label>
              <Input
                id="target-mileage"
                value={targetMileage}
                onChange={(e) => setTargetMileage(e.target.value)}
                placeholder="Enter target mileage"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="long-run-day">Long Run Day</Label>
            <Select value={longRunDay} onValueChange={setLongRunDay}>
              <SelectTrigger id="long-run-day">
                <SelectValue placeholder="Select long run day" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={generatePlan}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Generate Plan
          </Button>
          {plan.length > 0 && (
            <Table className="bg-white/50 dark:bg-black/50 backdrop-blur-lg">
              <TableHeader>
                <TableRow className="border-b border-blue-200 dark:border-blue-800">
                  <TableHead className="text-blue-600 dark:text-blue-300">
                    Week
                  </TableHead>
                  <TableHead className="text-blue-600 dark:text-blue-300">
                    Total Mileage
                  </TableHead>
                  {daysOfWeek.map((day, i) => (
                    <TableHead
                      key={i}
                      className="text-blue-600 dark:text-blue-300"
                    >
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {plan.map((week, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-blue-100 dark:border-blue-900"
                  >
                    <TableCell>{week.week}</TableCell>
                    <TableCell>{week.totalMileage.toFixed(2)}</TableCell>
                    {week.runs.map((run, runIndex) => (
                      <TableCell key={runIndex}>{run.toFixed(2)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
