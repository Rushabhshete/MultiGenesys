import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEmployeesAPI,
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
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (emp) => emp.id === action.payload.id,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((emp) => emp.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
