
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Box, Typography } from "@mui/material";
export const NoRowsOverlay = ({ searchActive }) => {
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <SearchOffIcon
        sx={{ fontSize: 50, color: "grey.500" }}
      />
      <Typography variant="h6" color="text.secondary">
        {searchActive
          ? "Employee not found"
          : "No employees available"}
      </Typography>
    </Box>
  );
};