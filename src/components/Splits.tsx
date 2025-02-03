import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type Split = {
  split: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface SplitsProps {
  splits: Split[];
}

export const Splits = ({ splits }: SplitsProps) => {
  return (
    <div className="p-4 rounded-md bg-[#191f33] mt-4">
      <Table>
        <TableHeader>
          <TableRow className="border-none">
            <TableHead className="text-white text-center">Split</TableHead>
            <TableHead className="text-white text-center">Hours</TableHead>
            <TableHead className="text-white text-center">Minutes</TableHead>
            <TableHead className="text-white text-center">Seconds</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {splits.map(({ split, hours, minutes, seconds }, index) => (
            <TableRow
              key={index}
              className={cn(
                index % 2 === 0 ? "bg-[#2a2f45]" : "bg-[#191f33]",
                "border-none",
                "text-white",
                "text-center",
              )}
            >
              <TableCell>{split}</TableCell>
              <TableCell>{hours}</TableCell>
              <TableCell>{minutes}</TableCell>
              <TableCell>{seconds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
