import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const headerElement = screen.getByRole("heading", /best store ever/i);
  expect(headerElement).toBeInTheDocument();
});
