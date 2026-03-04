import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeForm from "../components/EmployeeForm";

describe("EmployeeForm", () => {
  const countries = [
    { id: "1", name: "India" },
    { id: "2", name: "USA" },
  ];

  const mockSubmit = vi.fn();

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  };

  const renderForm = () =>
    render(
      <EmployeeForm
        initialValues={initialValues}
        countries={countries}
        onSubmit={mockSubmit}
      />
    );

  // Test 1: Form renders
  it("renders employee form fields", () => {
    renderForm();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();
  });

  // Test 2: Submit button exists
  it("renders submit button", () => {
    renderForm();

    const button = screen.getByRole("button", { name: /add employee/i });
    expect(button).toBeInTheDocument();
  });

  // Test 3: Inputs accept typing
  it("allows user to type in fields", () => {
    renderForm();

    const nameInput = screen.getByLabelText(/full name/i);

    fireEvent.change(nameInput, {
      target: { value: "John Doe" },
    });

    expect(nameInput.value).toBe("John Doe");
  });
});