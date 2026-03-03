import { useEffect, useMemo, useState } from "react";
import { Box, TextField, Button, Chip, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import {
  clearEmployeeError,
  clearEmployeeSearch,
  fetchEmployeeById,
  fetchEmployees,
  deleteEmployee,
} from "../features/employees/employeeSlice";
import AppSnackbar from "../common/AppSnackbar";
import AddIcon from "@mui/icons-material/Add";
import ConfirmDialog from "../common/ConfirmDialog";
import { fetchCountries } from "../features/countries/countrySlice";

const EmployeeListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    list: employees,
    loading,
    error,
    searchResult,
    searchLoading,
    searchError,
  } = useSelector((state) => state.employees);
  const countries = useSelector((state) => state.countries.list);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [searchId, setSearchId] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees())
      .unwrap()
      .catch((message) => {
        setSnackbar({
          open: true,
          message: message || "Failed to fetch employees",
          severity: "error",
        });
      });
  }, [dispatch]);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries.length]);

  const countryNameById = useMemo(
    () => new Map(countries.map((country) => [String(country.id), country.country])),
    [countries],
  );

  const mappedEmployeeRows = useMemo(
    () =>
      employees.map((employee) => ({
        ...employee,
        country: countryNameById.get(String(employee.country)) || employee.country || "-",
      })),
    [employees, countryNameById],
  );

  const searchedRow = useMemo(
    () =>
      searchResult
        ? [
            {
              ...searchResult,
              country:
                countryNameById.get(String(searchResult.country)) ||
                searchResult.country ||
                "-",
            },
          ]
        : [],
    [searchResult, countryNameById],
  );

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    setIsSearchActive(true);
    try {
      await dispatch(fetchEmployeeById(searchId.trim())).unwrap();
    } catch {
      // No-op. UI handles not found via overlay using search state.
    }
  };

  const handleClearSearch = () => {
    setSearchId("");
    setIsSearchActive(false);
    dispatch(clearEmployeeSearch());
  };

  const handleEdit = (id) => {
    navigate(`/updateemployee/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    const idToDelete = deleteId;
    setDeleteId(null);

    try {
      await dispatch(deleteEmployee(idToDelete)).unwrap();

      setSnackbar({
        open: true,
        message: `Employee deleted successfully`,
        severity: "success",
      });

      // Reset search if we deleted the searched employee
      if (isSearchActive && searchId === idToDelete.toString()) {
        setSearchId("");
        setIsSearchActive(false);
        dispatch(clearEmployeeSearch());
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to delete employee",
        severity: "error",
      });
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const tableRows = isSearchActive ? searchedRow : mappedEmployeeRows;

  return (
    <Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        mt={2}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Left Section */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          alignItems="center"
          sx={{ flex: 1, minWidth: 250 }}
        >
          <TextField
            label="Search by Employee ID"
            placeholder="Enter employee ID"
            size="small"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            sx={{
              minWidth: { xs: "100%", sm: 250 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {!isSearchActive ? (
            <Button
              variant="contained"
              size="small"
              onClick={handleSearch}
              disabled={!searchId.trim()}
            >
              Search
            </Button>
          ) : (
            <Button variant="outlined" size="small" onClick={handleClearSearch}>
              Clear
            </Button>
          )}

          <Chip
            label={`Total Employees: ${tableRows.length}`}
            color="warning"
            variant="outlined"
          />
        </Box>

        {/* Right Section */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/createnewemployee")}
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
          size="small"
        >
          Add Employee
        </Button>
      </Box>

      <EmployeeTable
        rows={tableRows}
        loading={loading || searchLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchActive={isSearchActive}
        searchedId={searchId}
      />

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete Employee"
        message={`Are you sure you want to delete employee with ID ${deleteId}? This action cannot be undone.`}
        confirmLabel="Delete"
        confirmColor="error"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <AppSnackbar
  open={snackbar.open || Boolean(error)} 
  message={snackbar.open ? snackbar.message : error || ""}
  severity={snackbar.open ? snackbar.severity : "error"}
  onClose={() => {
    if (snackbar.open) {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }
    if (error) {
      dispatch(clearEmployeeError());
    }
  }}
/>
    </Box>
  );
};

export default EmployeeListPage;
