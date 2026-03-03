import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCountries } from "./countryAPI";

/**
 * Get all countries from API.
 * Used to country dropdown in employee forms.
 */
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, thunkAPI) => {
    try {
      return await getAllCountries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Country slice state 
 */
const initialState = {
  list: [],
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all country lifecycle
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default countrySlice.reducer;