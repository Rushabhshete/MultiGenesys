import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  updateEmployee,
  fetchEmployees,
} from "../features/employees/employeeSlice";
import EmployeeForm from "../components/EmployeeForm";
import { fetchCountries } from "../features/countries/countrySlice";


const EmployeeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.countries.list);
  const employees = useSelector((state) => state.employees.list);
  const loading = useSelector((state) => state.employees.loading);

  // Load countries
  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries.length]);

  // Load employees if empty (important for edit refresh case)
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  const existingEmployee = employees.find(
    (emp) => emp.id === id
  );

  const handleSubmit = async (data) => {
    if (id) {
      await dispatch(updateEmployee({ id, data }));
    } else {
      await dispatch(createEmployee(data));
    }

    navigate("/");
  };

  const defaultFormValues = existingEmployee || {
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  };

  return (
    <EmployeeForm
      initialValues={defaultFormValues}
      countries={countries}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default EmployeeFormPage;