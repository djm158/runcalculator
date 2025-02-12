import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SplitsTable = ({
  splits,
  unit,
}: {
  splits: { distance: number; time: string }[];
  unit: "miles" | "kilometers";
}) => {
  return (
    <Table className="bg-white/50 dark:bg-black/50 backdrop-blur-lg">
      <TableHeader>
        <TableRow className="border-b border-purple-200 dark:border-purple-800">
          <TableHead className="text-purple-600 dark:text-purple-300">
            Distance ({unit})
          </TableHead>
          <TableHead className="text-purple-600 dark:text-purple-300">
            Time
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {splits.map((split, index) => (
          <TableRow
            key={index}
            className="border-b border-purple-100 dark:border-purple-900"
          >
            <TableCell>{split.distance.toFixed(2)}</TableCell>
            <TableCell>{split.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
