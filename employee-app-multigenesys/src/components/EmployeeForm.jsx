import Grid from "@mui/material/Grid";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Autocomplete,
  Chip,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be at most 60 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Mobile must contain digits only")
    .min(10, "Minimum 10 digits")
    .max(15, "Maximum 15 digits")
    .required("Mobile is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string()
    .min(2, "State must be at least 2 characters")
    .required("State is required"),
  district: Yup.string()
    .min(2, "District must be at least 2 characters")
    .required("District is required"),
});

const EmployeeForm = ({
  initialValues,
  countries,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const isEdit = Boolean(initialValues?.id);

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, md: 4 },
        mx: "auto",
        // mt: 2,
        borderRadius: 3,
      }}
    >
      <Chip
        label={isEdit ? "Edit Employee" : "Add Employee"}
        color={isEdit ? "warning" : "primary"}
        variant="filled"
        sx={{
          color: "white",
          fontWeight: 600,
          fontSize: "1rem",
          px: 2,
          py: 2,
          display: "flex",
          justifyContent: "center",
          mx: "auto",
          mb: 3,
        }}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form noValidate>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  placeholder="e.g. Rushabh Shete"
                  value={values.name}
                  onChange={handleChange}
                  required
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  inputProps={{ maxLength: 60 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="e.g. user@email.com"
                  value={values.email}
                  onChange={handleChange}
                  required
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  placeholder="e.g. 9876543210"
                  value={values.mobile}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    setFieldValue("mobile", digits);
                  }}
                  required
                  error={touched.mobile && !!errors.mobile}
                  helperText={touched.mobile && errors.mobile}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 15,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Autocomplete
                  options={countries || []}
                  getOptionLabel={(option) => option.country || ""}
                  value={
                    countries?.find(
                      (c) =>
                        String(c.id) === String(values.country) ||
                        c.country === values.country,
                    ) || null
                  }
                  onChange={(_, newValue) => {
                    setFieldValue(
                      "country",
                      newValue ? String(newValue.id) : "",
                    );
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      required
                      error={touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  placeholder="e.g. Maharashtra"
                  value={values.state}
                  onChange={handleChange}
                  required
                  error={touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                  inputProps={{ maxLength: 60 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="District"
                  name="district"
                  placeholder="e.g. Kolhapur"
                  value={values.district}
                  onChange={handleChange}
                  required
                  error={touched.district && !!errors.district}
                  helperText={touched.district && errors.district}
                  inputProps={{ maxLength: 60 }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                  <Button
                    type="button"
                    variant="outlined"
                    size="large"
                    onClick={onCancel}
                    disabled={loading}
                    sx={{ px: 4, borderRadius: 2 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    disabled={loading}
                    sx={{ px: 4, borderRadius: 2,color:"white" }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : isEdit ? (
                      "Update Employee"
                    ) : (
                      "Add Employee"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default EmployeeForm;
