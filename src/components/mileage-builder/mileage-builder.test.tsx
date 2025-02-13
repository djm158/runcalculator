import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MileageBuilder } from "./mileage-builder";

describe("MileageBuilder", () => {
  it("renders the component", () => {
    render(<MileageBuilder />);
    expect(screen.getByText("Mileage Builder")).toBeInTheDocument();
  });

  it("allows input of base weekly mileage", () => {
    render(<MileageBuilder />);
    const input = screen.getByLabelText(
      /base weekly mileage/i,
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "30" } });
    expect(input.value).toBe("30");
  });

  it("allows selection of run days", () => {
    render(<MileageBuilder />);
    const mondayCheckbox = screen.getByRole("checkbox", { name: /monday/i });
    fireEvent.click(mondayCheckbox);
    expect(mondayCheckbox).toBeChecked();
  });

  it("generates a training plan when all required fields are filled", () => {
    render(<MileageBuilder />);

    // Fill required fields
    fireEvent.change(screen.getByLabelText(/base weekly mileage/i), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByLabelText(/target weekly mileage/i), {
      target: { value: "40" },
    });
    fireEvent.change(screen.getByLabelText(/increase percentage/i), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText(/recovery week frequency/i), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByLabelText(/long run percentage/i), {
      target: { value: "30" },
    });

    // Select Sunday as run day (default long run day)
    const sundayCheckbox = screen.getByRole("checkbox", { name: /sunday/i });
    fireEvent.click(sundayCheckbox);

    const generateButton = screen.getByRole("button", {
      name: /generate plan/i,
    });
    fireEvent.click(generateButton);

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("disables generate button when required fields are empty", () => {
    render(<MileageBuilder />);
    const generateButton = screen.getByRole("button", {
      name: /generate plan/i,
    });
    expect(generateButton).toBeDisabled();
  });
});
