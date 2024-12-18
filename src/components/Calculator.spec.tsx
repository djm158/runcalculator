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

    // Set distance to 10
    fireEvent.change(screen.getByPlaceholderText("Distance"), {
      target: {
        value: 10,
      },
    });
    // Set pace to 5
    fireEvent.change(screen.getAllByPlaceholderText("Min")[1], {
      target: {
        value: 5,
      },
    });
    // Calculate time
    fireEvent.click(screen.getAllByText("Calculate")[0]);

    await waitFor(() => {
      // Expect time to be 50 minutes
      expect(screen.getAllByPlaceholderText("Min")[0]).toHaveValue(50);
    });
  });

  it("calculates pace", async () => {
    render(<Calculator />);

    // Set distance to 10
    fireEvent.change(screen.getByPlaceholderText("Distance"), {
      target: {
        value: 10,
      },
    });
    // Set time to 50
    fireEvent.change(screen.getAllByPlaceholderText("Min")[0], {
      target: {
        value: 50,
      },
    });
    // Calculate pace
    fireEvent.click(screen.getAllByText("Calculate")[1]);

    await waitFor(() => {
      // Expect pace to be 5
      expect(screen.getAllByPlaceholderText("Min")[1]).toHaveValue(5);
    });
  });

  it("generates splits", async () => {
    render(<Calculator />);

    fireEvent.change(screen.getByPlaceholderText("Distance"), {
      target: {
        value: 5,
      },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Min")[1], {
      target: {
        value: 6,
      },
    });
    fireEvent.click(screen.getByText("Generate Splits"));
    await waitFor(() => {
      expect(screen.getByText("Split")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
      expect(screen.getByText("4")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });
});
