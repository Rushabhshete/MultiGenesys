import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllEmployee,
  getEmployeeById,
  deleteEmployeeById,
  createEmployeeAPI,
  updateEmployeeById,
} from "./employeeAPI";

// --- ASYNC THUNKS ---
// These handle all employee  API interactions.

// Fetches the complete list of employees.
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, thunkAPI) => {
    try {
      const data = await getAllEmployee();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Creates a new employee.
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (data, thunkAPI) => {
    try {
      const result = await createEmployeeAPI(data);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Fetches one employee using ID.
// used for the search functionality and pre-filling form when editing.
export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id, thunkAPI) => {
    try {
      const data = await getEmployeeById(id);
      return data;
    } catch (error) {
      const message =
        error?.response?.status === 404
          ? "Employee not found"
          : error.message || "Failed to fetch employee";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Updates an existing employee.
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, data }, thunkAPI) => {
    try {
      const result = await updateEmployeeById(id, data);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Delete an employee using ID.
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, thunkAPI) => {
    try {
      await deleteEmployeeById(id);
      // Return the ID to remove it from the state.
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// --- INITIAL STATE ---
const initialState = {
  list: [],    // Main employee list state
  loading: false, // Tracks loading for the main list (get, create, update, delete)
  error: null, // Tracks errors for the main list operations

  // State for the search by ID
  searchResult: null, // Holds the single employee object found
  searchLoading: false, // Tracks loading specifically for the search
  searchError: null, // Tracks errors specifically for the search
};

// --- SLICE DEFINITION ---
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  // Regular reducers for synchronous state changes.
    reducers: {
    // Clears out any existing errors.
    clearEmployeeError: (state) => {
      state.error = null;
      state.searchError = null;
    },
    // Resets the search state
    clearEmployeeSearch: (state) => {
      state.searchResult = null;
      state.searchError = null;
      state.searchLoading = false;
    },
  },
  // Handlers for  async thunks.
  extraReducers: (builder) => {
    builder

      //  GET ALL EMPLOYEES 
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  GET EMPLOYEE BY ID (SEARCH) 
      .addCase(fetchEmployeeById.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
        state.searchResult = null; // Clear previous result
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResult = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchResult = null;
        state.searchError = action.payload;
      })

      //  CREATE NEW EMPLOYEE 
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  UPDATE EMPLOYEE 
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        // Find the employee in the list and update it.
        const index = state.list.findIndex(
          (emp) => String(emp.id) === String(action.payload.id),
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (String(state.searchResult?.id) === String(action.payload.id)) {
          state.searchResult = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  DELETE EMPLOYEE 
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        // Filter the deleted employee out of the main list.
        state.list = state.list.filter((emp) => emp.id !== action.payload);
        // If we just deleted the searched employee, clear the search result.
        if (state.searchResult?.id?.toString() === action.payload?.toString()) {
          state.searchResult = null;
        }
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmployeeError, clearEmployeeSearch } =
  employeeSlice.actions;
export default employeeSlice.reducer;
