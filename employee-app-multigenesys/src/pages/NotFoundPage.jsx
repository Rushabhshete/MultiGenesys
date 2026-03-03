import { Box, Typography, Button, Paper } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <Paper
        elevation={2}
        sx={{ p: 6, textAlign: "center", maxWidth: 420, borderRadius: 3 }}
      >
        <SearchOffIcon sx={{ fontSize: 72, color: "grey.400", mb: 2 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          404
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body2" color="text.disabled" mb={4}>
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate("/")}>
          Back to Employees
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;
