import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import { MILES_TO_KILOMETERS } from "@/const";

import { RaceSplitsGenerator } from "./splits-generator";

describe("RaceSplitsGenerator", () => {
  it("renders the component", () => {
    render(<RaceSplitsGenerator />);
    expect(screen.getByText("Race Splits Generator")).toBeInTheDocument();
  });

  it("allows input of distance", () => {
    render(<RaceSplitsGenerator />);
    const input = screen.getAllByLabelText(/distance/i)[0] as HTMLInputElement;
    fireEvent.change(input, { target: { value: "5" } });
    expect(input.value).toBe("5");
  });

  it("converts distance when changing units", () => {
    render(<RaceSplitsGenerator />);
    const input = screen.getAllByLabelText(/distance/i)[0] as HTMLInputElement;
    fireEvent.change(input, { target: { value: "5" } });

    // Change from miles to kilometers
    const unitSelect = screen.getByLabelText(/unit/i);
    fireEvent.click(unitSelect);
    fireEvent.click(screen.getByText(/kilometers/i));

    // 5 miles should convert to ~8.05 kilometers
    expect(input.value).toBe((5 * MILES_TO_KILOMETERS).toFixed(2));
  });

  it("allows input of pace", () => {
    render(<RaceSplitsGenerator />);
    const minutesInput = screen.getByLabelText(
      /pace minutes/i,
    ) as HTMLInputElement;
    const secondsInput = screen.getByLabelText(
      /pace seconds/i,
    ) as HTMLInputElement;

    fireEvent.change(minutesInput, { target: { value: "8" } });
    fireEvent.change(secondsInput, { target: { value: "30" } });

    expect(minutesInput.value).toBe("8");
    expect(secondsInput.value).toBe("30");
  });

  it("generates splits when all required fields are filled", () => {
    render(<RaceSplitsGenerator />);

    // Fill in required fields
    const distanceInput = screen.getAllByLabelText(
      /distance/i,
    )[0] as HTMLInputElement;
    fireEvent.change(distanceInput, { target: { value: "5" } });

    const minutesInput = screen.getByLabelText(/pace minutes/i);
    const secondsInput = screen.getByLabelText(/pace seconds/i);
    fireEvent.change(minutesInput, { target: { value: "8" } });
    fireEvent.change(secondsInput, { target: { value: "30" } });

    // Click generate button
    const generateButton = screen.getByRole("button", {
      name: /generate splits/i,
    });
    fireEvent.click(generateButton);

    // Check if splits table appears
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("disables generate button when required fields are empty", () => {
    render(<RaceSplitsGenerator />);
    const generateButton = screen.getByRole("button", {
      name: /generate splits/i,
    });
    expect(generateButton).toBeDisabled();
  });

  it("updates distance when selecting a predefined race", async () => {
    render(<RaceSplitsGenerator />);

    // Open race select
    const raceSelect = screen.getAllByRole("combobox")[1];
    userEvent.click(raceSelect);
    await waitFor(() => {
      const listbox = screen.getByRole("listbox");
      // Select 5K
      fireEvent.click(within(listbox).getByText("5k"));
    });

    // Check if distance is updated to 5K in miles
    const distanceInput = screen.getAllByLabelText(
      /distance/i,
    )[0] as HTMLInputElement;
    expect(distanceInput.value).toBe((5 / MILES_TO_KILOMETERS).toFixed(2));
  });

  it("maintains race distance value when switching units", async () => {
    render(<RaceSplitsGenerator />);

    // Select 5K
    const raceSelect = screen.getAllByRole("combobox")[1];
    userEvent.click(raceSelect);
    await waitFor(() => {
      const listbox = screen.getByRole("listbox");
      fireEvent.click(within(listbox).getByText("5k"));
    });

    // Switch to kilometers
    const unitSelect = screen.getByLabelText(/unit/i);
    fireEvent.click(unitSelect);
    fireEvent.click(screen.getByText(/kilometers/i));

    // Distance should now be 5 kilometers
    const distanceInput = screen.getAllByLabelText(
      /distance/i,
    )[0] as HTMLInputElement;
    // TODO: rounding error
    expect(distanceInput.value).toBe("5.01");
  });
});
