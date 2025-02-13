import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

import {
  DEFAULT_INCREASE_PERCENTAGE,
  DEFAULT_LONG_RUN_PERCENTAGE,
  DEFAULT_RECOVERY_WEEK_FREQUENCY,
  DEFAULT_RECOVERY_WEEK_PERCENTAGE,
  WEEKDAY_OPTIONS,
} from "./const";
import { Day } from "./types";
import { formatMileage, createPlan } from "./utils";

export const MileageBuilder = () => {
  const [baseMileage, setBaseMileage] = useState("");
  const [increasePercentage, setIncreasePercentage] = useState(
    DEFAULT_INCREASE_PERCENTAGE,
  );
  const [recoveryWeekFrequency, setRecoveryWeekFrequency] = useState(
    DEFAULT_RECOVERY_WEEK_FREQUENCY,
  );
  const [recoveryWeekPercentage, setRecoveryWeekPercentage] = useState(
    DEFAULT_RECOVERY_WEEK_PERCENTAGE,
  );
  const [targetMileage, setTargetMileage] = useState("");
  const [longRunPercentage, setLongRunPercentage] = useState(
    DEFAULT_LONG_RUN_PERCENTAGE,
  );
  const [longRunDay, setLongRunDay] = useState<Day>("Sunday");
  const [plan, setPlan] = useState<
    {
      week: number;
      totalMileage: number;
      runs: number[];
    }[]
  >([]);
  const [runDays, setRunDays] = useState<Day[]>([]);
  const [roundDecimals, setRoundDecimals] = useState(false);

  const handleGeneratePlan = () => {
    if (
      !baseMileage ||
      !increasePercentage ||
      !recoveryWeekFrequency ||
      !targetMileage ||
      !longRunPercentage ||
      runDays.length === 0 ||
      !runDays.includes(longRunDay)
    ) {
      return;
    }
    const newPlan = createPlan({
      baseMileage: Number.parseFloat(baseMileage),
      increasePercentage: Number.parseFloat(increasePercentage),
      runDays,
      recoveryWeekFrequency: Number.parseInt(recoveryWeekFrequency),
      targetMileage: Number.parseFloat(targetMileage),
      longRunPercentage: Number.parseFloat(longRunPercentage),
      recoveryWeekPercentage: Number.parseFloat(recoveryWeekPercentage),
      longRunDay,
    });
    setPlan(newPlan);
  };

  return (
    <Card className="bg-white/30 dark:bg-black/30 backdrop-blur-lg border-blue-200 dark:border-blue-800">
      <CardHeader className="border-b border-blue-200 dark:border-blue-800">
        <CardTitle className="text-blue-600 dark:text-blue-300">
          Mileage Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-4">
          <div>
            <Label className="text-lg mb-2">
              Which days of the week do you run?
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 py-2 pr-10 md:pr-0">
              {WEEKDAY_OPTIONS.map((item) => (
                <div
                  className="flex items-center justify-between w-full md:w-[120px]"
                  key={item.value}
                >
                  <Label htmlFor={item.value}>{item.label}</Label>
                  <Checkbox
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-blue-500 h-6 w-6"
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setRunDays([...runDays, item.value]);
                      } else {
                        setRunDays(runDays.filter((day) => day !== item.value));
                      }
                    }}
                    id={item.value}
                    value={item.value}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="base-mileage">Base Weekly Mileage</Label>
              <Input
                id="base-mileage"
                value={baseMileage}
                onChange={(e) => setBaseMileage(e.target.value)}
                placeholder="Enter base mileage"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="increase-percentage">Increase Percentage</Label>
              <Input
                id="increase-percentage"
                value={increasePercentage}
                onChange={(e) => setIncreasePercentage(e.target.value)}
                placeholder="Enter increase %"
                type="number"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="long-run-percentage">Long Run Percentage</Label>
              <Input
                id="long-run-percentage"
                value={longRunPercentage}
                onChange={(e) => setLongRunPercentage(e.target.value)}
                placeholder="Enter long run %"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="long-run-day">Long Run Day</Label>
              <Select
                value={longRunDay}
                onValueChange={(value) => setLongRunDay(value as Day)}
              >
                <SelectTrigger id="long-run-day" ariaLabel="Long Run Day Menu">
                  <SelectValue placeholder="Select long run day" />
                </SelectTrigger>
                <SelectContent>
                  {WEEKDAY_OPTIONS.map((day) => (
                    <SelectItem key={day.value} value={day.value}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recovery-week-frequency">
                Recovery Week Frequency
              </Label>
              <Input
                id="recovery-week-frequency"
                value={recoveryWeekFrequency}
                onChange={(e) => setRecoveryWeekFrequency(e.target.value)}
                placeholder="Enter recovery week frequency"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="recovery-week-percentage">
                Recovery Week Percentage
              </Label>
              <Input
                id="recovery-week-percentage"
                value={recoveryWeekPercentage}
                onChange={(e) => setRecoveryWeekPercentage(e.target.value)}
                placeholder="Enter recovery week %"
                type="number"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target-mileage">Target Weekly Mileage</Label>
              <Input
                id="target-mileage"
                value={targetMileage}
                onChange={(e) => setTargetMileage(e.target.value)}
                placeholder="Enter target mileage"
                type="number"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="round-decimals">Round Decimals</Label>
              <Checkbox
                id="round-decimals"
                className="data-[state=checked]:bg-primary data-[state=checked]:text-blue-500 h-6 w-6"
                checked={roundDecimals}
                onCheckedChange={(checked) =>
                  checked !== "indeterminate" && setRoundDecimals(checked)
                }
              />
            </div>
          </div>
          <Button
            disabled={
              !baseMileage ||
              !increasePercentage ||
              !recoveryWeekFrequency ||
              !targetMileage ||
              !longRunPercentage ||
              runDays.length === 0 ||
              !runDays.includes(longRunDay)
            }
            onClick={handleGeneratePlan}
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
                  {WEEKDAY_OPTIONS.map((day, i) => (
                    <TableHead
                      key={i}
                      className="text-blue-600 dark:text-blue-300"
                    >
                      {day.label}
                    </TableHead>
                  ))}
                  <TableHead className="text-blue-600 dark:text-blue-300">
                    Total Mileage
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plan.map((week, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-blue-100 dark:border-blue-900"
                  >
                    <TableCell>{week.week}</TableCell>
                    {week.runs.map((run, runIndex) => (
                      <TableCell key={runIndex}>
                        {formatMileage(run, roundDecimals)}
                      </TableCell>
                    ))}
                    <TableCell>
                      {formatMileage(week.totalMileage, roundDecimals)}
                    </TableCell>
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
