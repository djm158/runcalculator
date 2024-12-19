import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Calculator } from "./Calculator";

describe("Calculator", () => {
  it("renders", () => {
    render(<Calculator />);
    expect(screen.getAllByText("Calculate")).toHaveLength(3);
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Pace")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();
  });

  it("calculates time", async () => {
    render(<Calculator />);

    fireEvent.change(screen.getByPlaceholderText("Distance"), {
      target: {
        value: 10,
      },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Min")[1], {
      target: {
        value: 5,
      },
    });
    fireEvent.click(screen.getAllByText("Calculate")[0]);
    await waitFor(() => {
      expect(screen.getAllByPlaceholderText("Min")[0]).toHaveValue(50);
    });
  });
});
