import employeeReducer, {
  fetchEmployees,
  deleteEmployee,
  updateEmployee,
} from "../features/employees/employeeSlice";

describe("employeeSlice", () => {
  const initialState = {
    list: [],
    loading: false,
    error: null,
    searchResult: null,
    searchLoading: false,
    searchError: null,
  };

  it("should return initial state", () => {
    expect(employeeReducer(undefined, { type: undefined }))
      .toEqual(initialState);
  });

  // ===== FETCH =====

  it("should handle fetchEmployees.pending", () => {
    const action = { type: fetchEmployees.pending.type };
    const state = employeeReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle fetchEmployees.fulfilled", () => {
    const mockEmployees = [{ id: "1", name: "John" }];

    const action = {
      type: fetchEmployees.fulfilled.type,
      payload: mockEmployees,
    };

    const state = employeeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.list).toEqual(mockEmployees);
  });

  it("should handle fetchEmployees.rejected", () => {
    const action = {
      type: fetchEmployees.rejected.type,
      payload: "Error",
    };

    const state = employeeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Error");
  });

  // ===== DELETE =====

  it("should remove employee on delete fulfilled", () => {
    const populatedState = {
      ...initialState,
      list: [
        { id: "1", name: "John" },
        { id: "2", name: "Jane" },
      ],
    };

    const action = {
      type: deleteEmployee.fulfilled.type,
      payload: "1",
    };

    const state = employeeReducer(populatedState, action);

    expect(state.list.length).toBe(1);
    expect(state.list[0].id).toBe("2");
  });

  // ===== UPDATE =====

  it("should update employee on update fulfilled", () => {
    const populatedState = {
      ...initialState,
      list: [{ id: "1", name: "John" }],
    };

    const action = {
      type: updateEmployee.fulfilled.type,
      payload: { id: "1", name: "John Updated" },
    };

    const state = employeeReducer(populatedState, action);

    expect(state.list[0].name).toBe("John Updated");
  });
});