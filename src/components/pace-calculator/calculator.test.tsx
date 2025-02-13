import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Unit } from "@/types";

import { Calculator } from "./calculator";
import { Placeholders } from "./content";

// CURRENT LAYOUT:
/*
 * Distance: [Input] [Unit ▼] [Calculate]
 *          [Race ▼]
 *
 * Time: [HH] [MM] [SS] [Calculate]
 *
 * Pace: [HH] [MM] [SS] [Calculate]
 *       [Unit ▼]
 */
const Buttons = {
  DISTANCE: 0,
  TIME: 1,
  PACE: 2,
} as const;

const Comboboxes = {
  DISTANCE_UNIT: 0,
  DISTANCE_RACE: 1,
  PACE_UNIT: 2,
} as const;

const PLACEHOLDER_INDICES = {
  MINUTES: {
    TIME: 0,
    PACE: 1,
  },
  SECONDS: {
    TIME: 0,
    PACE: 1,
  },
} as const;

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

    // Set distance to 10 miles, pace to 5 minutes, and calculate time
    fireEvent.change(screen.getByPlaceholderText(Placeholders.DISTANCE), {
      target: {
        value: 10,
      },
    });
    fireEvent.change(
      screen.getAllByPlaceholderText(Placeholders.MINUTES)[
        PLACEHOLDER_INDICES.MINUTES.PACE
      ],
      {
        target: {
          value: 5,
        },
      },
    );
    fireEvent.click(screen.getAllByText(Placeholders.CALCULATE)[Buttons.TIME]);
    await waitFor(() => {
      expect(
        screen.getAllByPlaceholderText(Placeholders.MINUTES)[
          PLACEHOLDER_INDICES.MINUTES.TIME
        ],
      ).toHaveValue(50);
    });
  });

  it("calculates pace", async () => {
    render(<Calculator />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.DISTANCE), {
      target: {
        value: 10,
      },
    });
    fireEvent.change(
      screen.getAllByPlaceholderText(Placeholders.MINUTES)[
        PLACEHOLDER_INDICES.MINUTES.TIME
      ],
      {
        target: {
          value: 50,
        },
      },
    );
    fireEvent.change(
      screen.getAllByPlaceholderText(Placeholders.SECONDS)[
        PLACEHOLDER_INDICES.SECONDS.TIME
      ],
      {
        target: {
          value: 0,
        },
      },
    );
    fireEvent.click(screen.getAllByText(Placeholders.CALCULATE)[Buttons.PACE]);
    await waitFor(() => {
      expect(
        screen.getAllByPlaceholderText(Placeholders.MINUTES)[
          PLACEHOLDER_INDICES.MINUTES.PACE
        ],
      ).toHaveValue(5);
      expect(
        screen.getAllByPlaceholderText(Placeholders.SECONDS)[
          PLACEHOLDER_INDICES.SECONDS.PACE
        ],
      ).toHaveValue(0);
    });
  });

  it("calculates distance", async () => {
    render(<Calculator />);

    // Set time to 10 minutes, pace to 5 minutes, and calculate distance
    fireEvent.change(
      screen.getAllByPlaceholderText(Placeholders.MINUTES)[
        PLACEHOLDER_INDICES.MINUTES.TIME
      ],
      {
        target: {
          value: 10,
        },
      },
    );
    fireEvent.change(
      screen.getAllByPlaceholderText(Placeholders.MINUTES)[
        PLACEHOLDER_INDICES.MINUTES.PACE
      ],
      {
        target: {
          value: 5,
        },
      },
    );
    fireEvent.click(
      screen.getAllByText(Placeholders.CALCULATE)[Buttons.DISTANCE],
    );
    await waitFor(() => {
      expect(screen.getByPlaceholderText(Placeholders.DISTANCE)).toHaveValue(2);
    });
  });

  it("handles pace conversion from miles to kilometers", async () => {
    render(<Calculator />);

    // Set distance to 10 miles, time to 50 minutes, and calculate pace
    fireEvent.change(screen.getByPlaceholderText(Placeholders.DISTANCE), {
      target: {
        value: 10,
      },
    });
    fireEvent.change(
      screen.getAllByPlaceholderText(Placeholders.MINUTES)[
        PLACEHOLDER_INDICES.MINUTES.TIME
      ],
      {
        target: {
          value: 50,
        },
      },
    );

    fireEvent.click(screen.getAllByText(Placeholders.CALCULATE)[Buttons.PACE]);
    await waitFor(() => {
      expect(
        screen.getAllByPlaceholderText(Placeholders.MINUTES)[
          PLACEHOLDER_INDICES.MINUTES.PACE
        ],
      ).toHaveValue(5);
    });

    // Mousedown the distance unit combobox and select kilometers
    userEvent.click(screen.getAllByRole("combobox")[Comboboxes.PACE_UNIT]);
    await waitFor(() => {
      const listbox = screen.getByRole("listbox");
      fireEvent.click(within(listbox).getByText(Unit.KILOMETERS));
    });
    fireEvent.click(screen.getAllByText(Placeholders.CALCULATE)[Buttons.PACE]);

    await waitFor(() => {
      expect(
        screen.getAllByPlaceholderText(Placeholders.MINUTES)[
          PLACEHOLDER_INDICES.MINUTES.PACE
        ],
      ).toHaveValue(3);
      expect(
        screen.getAllByPlaceholderText(Placeholders.SECONDS)[
          PLACEHOLDER_INDICES.SECONDS.PACE
        ],
      ).toHaveValue(6.41);
    });
  });

  it("converts kilometers to miles", async () => {
    render(<Calculator />);

    // Set time to 10 minutes, pace to 5 minutes, and calculate distance
    fireEvent.change(
      screen.getAllByPlaceholderText(Placeholders.MINUTES)[
        PLACEHOLDER_INDICES.MINUTES.TIME
      ],
      {
        target: {
          value: 10,
        },
      },
    );

    fireEvent.change(
      screen.getAllByPlaceholderText(Placeholders.MINUTES)[
        PLACEHOLDER_INDICES.MINUTES.PACE
      ],
      {
        target: {
          value: 5,
        },
      },
    );

    // Mousedown the distance unit combobox and select kilometers
    // Then recalculate the distance
    userEvent.click(screen.getAllByRole("combobox")[Comboboxes.DISTANCE_UNIT]);
    await waitFor(() => {
      const listbox = within(screen.getByRole("listbox"));
      fireEvent.click(listbox.getByText(Unit.KILOMETERS));
    });

    fireEvent.click(
      screen.getAllByText(Placeholders.CALCULATE)[Buttons.DISTANCE],
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(Placeholders.DISTANCE)).toHaveValue(
        3.21868,
      );
    });

    // Mousedown the distance unit combobox and select miles
    // Then recalculate the distance
    userEvent.click(screen.getAllByRole("combobox")[Comboboxes.DISTANCE_UNIT]);
    await waitFor(() => {
      const listbox = within(screen.getByRole("listbox"));
      fireEvent.click(listbox.getByText(Unit.MILES));
    });

    fireEvent.click(
      screen.getAllByText(Placeholders.CALCULATE)[Buttons.DISTANCE],
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(Placeholders.DISTANCE)).toHaveValue(2);
    });
  });

  it("converts miles to kilometers", async () => {
    render(<Calculator />);

    // Set time to 10 minutes, pace to 5 minutes, and calculate distance
    fireEvent.change(
      screen.getAllByPlaceholderText(Placeholders.MINUTES)[
        PLACEHOLDER_INDICES.MINUTES.TIME
      ],
      {
        target: {
          value: 10,
        },
      },
    );

    fireEvent.change(
      screen.getAllByPlaceholderText(Placeholders.MINUTES)[
        PLACEHOLDER_INDICES.MINUTES.PACE
      ],
      {
        target: {
          value: 5,
        },
      },
    );

    fireEvent.click(
      screen.getAllByText(Placeholders.CALCULATE)[Buttons.DISTANCE],
    );

    // Mousedown the distance unit combobox and select kilometers
    // Then recalculate the distance
    userEvent.click(screen.getAllByRole("combobox")[Comboboxes.DISTANCE_UNIT]);
    await waitFor(() => {
      const listbox = within(screen.getByRole("listbox"));
      fireEvent.click(listbox.getByText(Unit.KILOMETERS));
    });

    fireEvent.click(
      screen.getAllByText(Placeholders.CALCULATE)[Buttons.DISTANCE],
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(Placeholders.DISTANCE)).toHaveValue(
        3.21868,
      );
    });
  });
});
