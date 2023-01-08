import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("homepage", () => {
  it("renders page header", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const headerElement = screen.getByTestId("page-title");
    expect(headerElement.textContent).toBe("facade");
  });
});
