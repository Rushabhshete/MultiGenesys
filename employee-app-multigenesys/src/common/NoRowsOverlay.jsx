import SearchOffIcon from "@mui/icons-material/SearchOff";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Box, Typography } from "@mui/material";

export const NoRowsOverlay = ({ searchActive, searchedId }) => (
  <Box
    height="100%"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    gap={1}
    data-testid="no-rows-overlay"
  >
    {searchActive ? (
      <>
        <SearchOffIcon sx={{ fontSize: 52, color: "grey.400" }} />
        <Typography variant="h6" color="text.secondary">
          No employee found with ID <strong>{searchedId}</strong>
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Check the ID and try again
        </Typography>
      </>
    ) : (
      <>
        <PeopleAltOutlinedIcon sx={{ fontSize: 52, color: "grey.400" }} />
        <Typography variant="h6" color="text.secondary">
          No employees yet
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Add your first employee to get started
        </Typography>
      </>
    )}
  </Box>
);
