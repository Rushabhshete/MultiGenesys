import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEmployeesAPI,
  fetchEmployeeByIdAPI,
  deleteEmployeeAPI,
  createEmployeeAPI,
  updateEmployeeAPI,
} from "./employeeAPI";

// Fetch employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, thunkAPI) => {
    try {
      const data = await fetchEmployeesAPI();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

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

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id, thunkAPI) => {
    try {
      const data = await fetchEmployeeByIdAPI(id);
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

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, data }, thunkAPI) => {
    try {
      const result = await updateEmployeeAPI(id, data);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Delete employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, thunkAPI) => {
    try {
      await deleteEmployeeAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  list: [],
  loading: false,
  error: null,
  searchResult: null,
  searchLoading: false,
  searchError: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearEmployeeError: (state) => {
      state.error = null;
      state.searchError = null;
    },
    clearEmployeeSearch: (state) => {
      state.searchResult = null;
      state.searchError = null;
      state.searchLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // ===== FETCH =====
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

      // ===== FETCH BY ID =====
      .addCase(fetchEmployeeById.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
        state.searchResult = null;
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

      // ===== CREATE =====
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

      // ===== UPDATE =====
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
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

      // ===== DELETE =====
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((emp) => emp.id !== action.payload);
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
