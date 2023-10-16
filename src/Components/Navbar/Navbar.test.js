import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

test("Navbar component is rendered correctly", () => {
  const { getByText } = render(<Navbar />);

  const gifPointComElement = getByText("GIF-point-com");

  expect(gifPointComElement).toBeInTheDocument();
});
