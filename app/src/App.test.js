import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  test("renders learn react link", () => {
    render(<App />);
    const header = screen.getByRole("heading", { name: "Spyballs" });
    expect(header).toBeInTheDocument();
  });
});
