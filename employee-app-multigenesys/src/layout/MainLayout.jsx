import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      <Header onMenuClick={() => setMobileOpen((prev) => !prev)} />
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          backgroundColor: "background.default",
          minWidth: 0,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
