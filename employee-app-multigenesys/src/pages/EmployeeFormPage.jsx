import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";
import {
  createEmployee,
  updateEmployee,
  fetchEmployeeById,
  fetchEmployees,
} from "../features/employees/employeeSlice";
import EmployeeForm from "../components/EmployeeForm";
import { fetchCountries } from "../features/countries/countrySlice";

import { useState } from "react";
import AppSnackbar from "../common/AppSnackbar";
//smart employee form page 
const EmployeeFormPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editLookupFailed, setEditLookupFailed] = useState(false);
  const countries = useSelector((state) => state.countries.list);
  const employees = useSelector((state) => state.employees.list);
  const searchedEmployee = useSelector((state) => state.employees.searchResult);
  const loading = useSelector((state) => state.employees.loading);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries.length]);

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  const existingEmployee = employees.find((emp) => emp.id.toString() === id);
  const employeeForForm =
    existingEmployee || (searchedEmployee?.id?.toString() === id ? searchedEmployee : null);

  useEffect(() => {
    if (!isEditMode || employeeForForm) return;

    dispatch(fetchEmployeeById(id))
      .unwrap()
      .then(() => setEditLookupFailed(false))
      .catch(() => setEditLookupFailed(true));
  }, [dispatch, id, isEditMode, employeeForForm]);

  const handleSubmit = async (data) => {
    try {
      if (isEditMode) {
        await dispatch(updateEmployee({ id, data })).unwrap();
        setSnackbar({
          open: true,
          message: "Employee updated successfully",
          severity: "success",
        });
      } else {
        await dispatch(createEmployee(data)).unwrap();
        setSnackbar({
          open: true,
          message: "Employee added successfully",
          severity: "success",
        });
      }

      setTimeout(() => navigate("/"), 1000);
    } catch {
      setSnackbar({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  const defaultFormValues = employeeForForm || {
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (isEditMode && !loading && editLookupFailed && !employeeForForm) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Paper elevation={2} sx={{ p: 4, textAlign: "center", maxWidth: 480 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Employee not found
          </Typography>
          <Typography color="text.secondary" mb={3}>
            No employee exists with ID {id}.
          </Typography>
          <Button variant="contained" onClick={handleCancel}>
            Back to Employees
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <>
      <EmployeeForm
        initialValues={defaultFormValues}
        countries={countries}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
};

export default EmployeeFormPage;
