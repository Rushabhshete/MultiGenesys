import { render, screen } from "@testing-library/react";
import { NoRowsOverlay } from "../common/NoRowsOverlay";

describe("NoRowsOverlay", () => {
  it("shows search message when searchActive is true", () => {
    render(<NoRowsOverlay searchActive={true} searchedId="444" />);
    expect(screen.getByText(/444/)).toBeInTheDocument();
  });

  it("shows default message when searchActive is false", () => {
    render(<NoRowsOverlay searchActive={false} searchedId="" />);
    expect(screen.getByText(/No employees yet/i)).toBeInTheDocument();
  });
});