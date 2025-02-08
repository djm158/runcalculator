import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PaceCalculator } from "./pace-calculator";

describe("Pace Calculator", () => {
  it("renders", () => {
    render(<PaceCalculator />);
    expect(screen.getAllByText("Calculate")).toHaveLength(3);
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Pace")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();
  });

  it("calculates time", async () => {
    render(<PaceCalculator />);

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

  it("calculates pace", async () => {
    render(<PaceCalculator />);

    fireEvent.change(screen.getByPlaceholderText("Distance"), {
      target: {
        value: 10,
      },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Min")[0], {
      target: {
        value: 50,
      },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Sec")[0], {
      target: {
        value: 0,
      },
    });
    fireEvent.click(screen.getAllByText("Calculate")[1]);
    await waitFor(() => {
      expect(screen.getAllByPlaceholderText("Min")[1]).toHaveValue(5);
      expect(screen.getAllByPlaceholderText("Sec")[1]).toHaveValue(0);
    });
  });

  it("calculates distance", async () => {
    render(<PaceCalculator />);

    fireEvent.change(screen.getAllByPlaceholderText("Min")[0], {
      target: {
        value: 10,
      },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Sec")[0], {
      target: {
        value: 0,
      },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Min")[1], {
      target: {
        value: 5,
      },
    });
    fireEvent.click(screen.getAllByText("Calculate")[2]);
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Distance")).toHaveValue(2);
    });
  });

  it("handles pace conversion from miles to kilometers", async () => {
    render(<PaceCalculator />);

    fireEvent.change(screen.getByPlaceholderText("Distance"), {
      target: {
        value: 10,
      },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Min")[0], {
      target: {
        value: 50,
      },
    });

    fireEvent.click(screen.getAllByText("Calculate")[1]);
    await waitFor(() => {
      expect(screen.getAllByPlaceholderText("Min")[1]).toHaveValue(5);
    });

    userEvent.click(screen.getAllByRole("combobox")[0]);
    await waitFor(() => {
      const listbox = screen.getByRole("listbox");
      fireEvent.click(within(listbox).getByText("Kilometers"));
    });
    fireEvent.click(screen.getAllByText("Calculate")[1]);

    await waitFor(() => {
      expect(screen.getAllByPlaceholderText("Min")[1]).toHaveValue(3);
      expect(screen.getAllByPlaceholderText("Sec")[1]).toHaveValue(6.41);
    });
  });

  it("converts kilometers to miles", async () => {
    render(<PaceCalculator />);

    // Set time to 10 minutes, pace to 5 minutes, and calculate distance
    fireEvent.change(screen.getAllByPlaceholderText("Min")[0], {
      target: {
        value: 10,
      },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Min")[1], {
      target: {
        value: 5,
      },
    });

    // Mousedown the distance unit combobox and select kilometers
    // Then recalculate the distance
    userEvent.click(screen.getAllByRole("combobox")[1]);
    await waitFor(() => {
      const listbox = within(screen.getByRole("listbox"));
      fireEvent.click(listbox.getByText("Kilometers"));
    });

    fireEvent.click(screen.getAllByText("Calculate")[2]);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Distance")).toHaveValue(3.21868);
    });

    // Mousedown the distance unit combobox and select miles
    // Then recalculate the distance
    userEvent.click(screen.getAllByRole("combobox")[1]);
    await waitFor(() => {
      const listbox2 = within(screen.getByRole("listbox"));
      fireEvent.click(listbox2.getByText("Miles"));
    });

    fireEvent.click(screen.getAllByText("Calculate")[2]);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Distance")).toHaveValue(2);
    });
  });

  it("converts miles to kilometers", async () => {
    render(<PaceCalculator />);

    // Set time to 10 minutes, pace to 5 minutes, and calculate distance
    fireEvent.change(screen.getAllByPlaceholderText("Min")[0], {
      target: {
        value: 10,
      },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Min")[1], {
      target: {
        value: 5,
      },
    });

    fireEvent.click(screen.getAllByText("Calculate")[2]);

    // Mousedown the distance unit combobox and select kilometers
    // Then recalculate the distance
    userEvent.click(screen.getAllByRole("combobox")[1]);
    await waitFor(() => {
      const listbox = within(screen.getByRole("listbox"));
      fireEvent.click(listbox.getByText("Kilometers"));
    });

    fireEvent.click(screen.getAllByText("Calculate")[2]);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Distance")).toHaveValue(3.21868);
    });
  });

  it("Generates splits table", async () => {
    render(<PaceCalculator />);

    fireEvent.change(screen.getAllByPlaceholderText("Min")[0], {
      target: {
        value: 10,
      },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Min")[1], {
      target: {
        value: 5,
      },
    });

    fireEvent.click(screen.getAllByText("Calculate")[2]);
    fireEvent.click(screen.getByText("Generate Splits"));

    await waitFor(() => {
      expect(screen.getByRole("cell", { name: "5" })).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: "10" })).toBeInTheDocument();
    });
  });
});
