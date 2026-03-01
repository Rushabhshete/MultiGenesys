import Grid from "@mui/material/Grid";
import {
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: Yup.string()
    .min(10, "Minimum 10 digits")
    .max(15, "Maximum 15 digits")
    .required("Mobile is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
});

const EmployeeForm = ({
  initialValues,
  countries,
  onSubmit,
  loading = false,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1000,
        mx: "auto",
        mt: 4,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        gutterBottom
        sx={{ mb: 3 }}
      >
        {initialValues?.id ? "Edit Employee" : "Add Employee"}
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <Grid container spacing={3}>
              {/* Name */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  placeholder="eg: Rushabh"
                  value={values.name}
                  onChange={handleChange}
                  required
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>

              {/* Email */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  placeholder="eg: rushabh@gmail.com"
                  value={values.email}
                  onChange={handleChange}
                  required
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              {/* Mobile */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  placeholder="eg: 8456390744"
                  value={values.mobile}
                  onChange={handleChange}
                  required
                  error={touched.mobile && !!errors.mobile}
                  helperText={touched.mobile && errors.mobile}
                />
              </Grid>

              {/* Country */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  select
                  label="Country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  required
                  error={touched.country && !!errors.country}
                  helperText={touched.country && errors.country}
                >
                  {countries?.map((c) => (
                    <MenuItem key={c.id} value={c.country}>
                      {c.country}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* State */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  placeholder="eg: Maharashtra"
                  value={values.state}
                  onChange={handleChange}
                  required
                  error={touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                />
              </Grid>

              {/* District */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  fullWidth
                  label="District"
                  name="district"
                  placeholder="eg: Kolhapur"
                  value={values.district}
                  onChange={handleChange}
                  required
                  error={touched.district && !!errors.district}
                  helperText={touched.district && errors.district}
                />
              </Grid>

              {/* Button Row */}
              <Grid size={{ xs: 12 }}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  mt={2}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      px: 4,
                      borderRadius: 2,
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : initialValues?.id ? (
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