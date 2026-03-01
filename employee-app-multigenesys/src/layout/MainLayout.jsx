import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "background.default",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
