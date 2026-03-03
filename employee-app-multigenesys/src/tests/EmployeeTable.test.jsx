import { render, screen } from "@testing-library/react";
import EmployeeTable from "../components/EmployeeTable";

describe("EmployeeTable", () => {
  it("renders rows correctly", () => {
    const rows = [
      {
        id: "1",
        name: "John",
        email: "john@test.com",
        mobile: "1234567890",
        country: "India",
      },
    ];

    render(
      <EmployeeTable
        rows={rows}
        loading={false}
        onEdit={() => {}}
        onDelete={() => {}}
        searchActive={false}
        searchedId=""
      />
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
  });
});