import { render, screen } from "@testing-library/react";
import { NoRowsOverlay } from "../common/NoRowsOverlay";

describe("NoRowsOverlay", () => {
  it("shows default message", () => {
    render(<NoRowsOverlay searchActive={false} searchedId="" />);
    expect(screen.getByText(/No employees yet/i)).toBeInTheDocument();
  });

  it("shows search message", () => {
    render(<NoRowsOverlay searchActive={true} searchedId="444" />);
    expect(screen.getByText(/444/)).toBeInTheDocument();
  });
});