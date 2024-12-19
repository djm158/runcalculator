import React from "react";
import { App } from "./App";
import { render } from "@testing-library/react";

it("renders without crashing", () => {
  expect(render(<App />)).toBeTruthy();
});
