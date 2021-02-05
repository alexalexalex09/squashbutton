import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders Home", () => {
  render(<App />);
  const linkElement = screen.getByText(/Join now!/i);
  expect(linkElement).toBeInTheDocument();
});
