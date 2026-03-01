import { useEffect, useState, useMemo } from "react";
import {
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import {
  fetchEmployees,
  deleteEmployee,
} from "../features/employees/employeeSlice";

const EmployeeListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: employees, loading } = useSelector(
    (state) => state.employees
  );

  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // 🔎 Filter from FULL list (before pagination)
  const filteredEmployees = useMemo(() => {
    if (!searchId.trim()) return employees;

    return employees.filter(
      (emp) => emp.id.toString() === searchId.trim()
    );
  }, [employees, searchId]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Search by Employee ID"
          placeholder="Enter employee ID"
          size="small"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        <Button
          variant="outlined"
          onClick={() => setSearchId("")}
        >
          Clear
        </Button>
      </Box>

      <EmployeeTable
        rows={filteredEmployees}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchActive={!!searchId}
      />
    </Box>
  );
};

export default EmployeeListPage;