import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          MultiGenesys CRM
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;