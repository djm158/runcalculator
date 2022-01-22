import { render, screen } from "@testing-library/react";
import { Calculator } from "./Calculator";

describe("Calculator", () => {
  it("renders", () => {
    render(<Calculator />);
    expect(screen.getAllByText("Calculate")).toHaveLength(3);
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Pace")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();
  });
});
