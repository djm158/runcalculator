import Box from "@material-ui/core/Box";

import styles from "./splits.module.css";

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
    <Box p="2rem" borderRadius={5} bgcolor="#191f33" mt={2}>
      <table>
        <thead>
          <tr>
            <th>Split</th>
            <th>Hours</th>
            <th>Minutes</th>
            <th>Seconds</th>
          </tr>
        </thead>
        <tbody>
          {splits.map((split, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0 ? styles["tr-light"] : styles["tr-dark"]
              }
            >
              <td>{split.split}</td>
              <td>{split.hours}</td>
              <td>{split.minutes}</td>
              <td>{split.seconds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};
