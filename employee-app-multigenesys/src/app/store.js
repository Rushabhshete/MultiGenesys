import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../features/countries/countrySlice";
import employeeReducer from "../features/employees/employeeSlice";

export const store = configureStore({
  reducer: {
    countries: countryReducer,
    employees: employeeReducer,
  },
});